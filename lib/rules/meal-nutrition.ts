/**
 * Deterministic nutrition-governance rules for meal-planner.
 * Rule-based (no LLM) tagging with stable ids + real refs.
 *
 * Research-augmented (RAD) against:
 *  - EU Reg. 1169/2011 — allergen labelling (14 major allergens)
 *  - FDA Food Code — food-safety / health claims
 *  - FTC — no disease / medical nutrition claims
 */
export const RULESET_ID = 'meal-nutrition'
export const RULESET_VERSION = '2026-07-20'

export interface RuleResult {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  message: string
  ref?: string
}

export interface Rule {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  ref: string
  check: (content: string, context?: Record<string, string>) => RuleResult
}

const MAJOR_ALLERGENS = [
  'celery', 'gluten', 'crustaceans', 'eggs', 'fish', 'lupin', 'milk',
  'molluscs', 'mustard', 'nuts', 'peanuts', 'sesame', 'soybeans', 'sulphites',
]

const rules: Rule[] = [
  {
    ruleId: 'MP-01',
    name: 'Major-allergen disclosure',
    category: 'safety',
    severity: 'high',
    ref: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011R1169-20180101',
    check: (content) => {
      const mentioned = MAJOR_ALLERGENS.filter((a) => content.includes(a))
      const hasDisclosure = mentioned.length === 0 || /(allergen|contains|may contain|free from)/i.test(content)
      return {
        ruleId: 'MP-01',
        name: 'Major-allergen disclosure',
        category: 'safety',
        severity: 'high',
        passed: hasDisclosure,
        message: hasDisclosure
          ? `Allergen handling present (EU 1169/2011).${mentioned.length ? ' Detected: ' + mentioned.join(', ') : ''}`
          : 'Disclose major allergens when present (EU Reg. 1169/2011).',
        ref: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011R1169-20180101',
      }
    },
  },
  {
    ruleId: 'MP-02',
    name: 'No disease / medical nutrition claims',
    category: 'claims',
    severity: 'high',
    ref: 'https://www.ftc.gov/business-guidance/advertising-marketing/health-claims',
    check: (content) => {
      const bad = /(cures|treats|diagnoses|prevents (diabetes|cancer|obesity))/i.test(content)
      const passed = !bad
      return {
        ruleId: 'MP-02',
        name: 'No disease / medical nutrition claims',
        category: 'claims',
        severity: 'high',
        passed,
        message: passed
          ? 'No disease / medical-nutrition claims (FTC).'
          : 'Remove disease-treatment claims (FTC health-claim rules).',
        ref: 'https://www.ftc.gov/business-guidance/advertising-marketing/health-claims',
      }
    },
  },
  {
    ruleId: 'MP-03',
    name: 'Dietary-restriction respect',
    category: 'inclusion',
    severity: 'medium',
    ref: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011R1169-20180101',
    check: (content) => {
      const passed = /(vegetarian|vegan|halal|kosher|gluten[- ]?free|dairy[- ]?free)/i.test(content)
      return {
        ruleId: 'MP-03',
        name: 'Dietary-restriction respect',
        category: 'inclusion',
        severity: 'medium',
        passed,
        message: passed
          ? 'Dietary-restriction labels present (EU 1169/2011).'
          : 'Label dietary restrictions (vegan/halal/kosher/gluten-free) (EU 1169/2011).',
        ref: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011R1169-20180101',
      }
    },
  },
  {
    ruleId: 'MP-04',
    name: 'Calorie-accuracy disclaimer',
    category: 'transparency',
    severity: 'medium',
    ref: 'https://www.fda.gov/food/food-labeling-nutrition',
    check: (content) => {
      const passed = /(approximate|estimated|±|about) (calories|kcal)|values are (estimates|approx)/i.test(content)
      return {
        ruleId: 'MP-04',
        name: 'Calorie-accuracy disclaimer',
        category: 'transparency',
        severity: 'medium',
        passed,
        message: passed
          ? 'Calorie figures disclaimed as estimates (FDA).'
          : 'Mark calorie figures as estimates (FDA Food Code).',
        ref: 'https://www.fda.gov/food/food-labeling-nutrition',
      }
    },
  },
  {
    ruleId: 'MP-05',
    name: 'Not a substitute for a dietitian',
    category: 'disclaimer',
    severity: 'medium',
    ref: 'https://www.ftc.gov/business-guidance/advertising-marketing/health-claims',
    check: (content) => {
      const passed = /(consult (a|your) (dietitian|nutritionist|doctor)|not a substitute|informational)/i.test(content)
      return {
        ruleId: 'MP-05',
        name: 'Not a substitute for a dietitian',
        category: 'disclaimer',
        severity: 'medium',
        passed,
        message: passed
          ? 'Professional-disclaimer present (FTC).'
          : 'Add "not a substitute for a registered dietitian" disclaimer (FTC).',
        ref: 'https://www.ftc.gov/business-guidance/advertising-marketing/health-claims',
      }
    },
  },
  {
    ruleId: 'MP-06',
    name: 'Infant / therapeutic diet warning',
    category: 'safety',
    severity: 'low',
    ref: 'https://www.fda.gov/infant-nutrition',
    check: (content) => {
      const targetsInfant = /(for (your )?baby|infant formula|under 1 year)/i.test(content)
      const passed = !targetsInfant
      return {
        ruleId: 'MP-06',
        name: 'Infant / therapeutic diet warning',
        category: 'safety',
        severity: 'low',
        passed,
        message: passed
          ? 'No unsupervised infant-therapeutic-diet plan (FDA).'
          : 'Add warning / paediatric guidance for infant diets (FDA).',
        ref: 'https://www.fda.gov/infant-nutrition',
      }
    },
  },
]

export function runAllRules(content: string, context?: Record<string, string>): RuleResult[] {
  return rules.map((r) => r.check(content, context))
}

export type RuleHit = { id: string; title: string; severity: 'low' | 'medium' | 'high'; passed: boolean; remediation?: string; ref?: string }
export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r: any) => ({
    id: String(r.id || r.ruleId || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: r.message || r.remediation,
    ref: r.ref || r.source,
  }))
}
