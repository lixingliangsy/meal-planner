export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  priceMonthly: 29,
  priceYearly: 290,
  "name": "MealPlanner",
  "slug": "meal-planner",
  "tagline": "A week of meals, planned",
  "description": "Set a goal and dietary restrictions; get a 7-day meal plan you can actually cook. For people who want to eat better without the spreadsheet.",
  "definitionLead": "MealPlanner builds a 7-day meal plan from your goal and dietary restrictions — simple meals you can actually cook, ready to copy or print.",
  "toolTitle": "Plan your week",
  "resultLabel": "Your meal plan",
  "ctaLabel": "Make plan",
  "features": [
    "7-day plan",
    "Respect restrictions",
    "Simple meals",
    "Copy / print"
  ],
  "inputs": [
    {
      "key": "goal",
      "label": "Goal",
      "type": "input",
      "placeholder": "e.g. Lose weight"
    },
    {
      "key": "restrict",
      "label": "Avoid / allergies",
      "type": "input",
      "placeholder": "e.g. No nuts"
    }
  ],
  "systemPrompt": "You are a meal planning assistant. Given a goal and restrictions, produce a 7-day plan with breakfast/lunch/dinner that respects the restrictions.",
  "pricing": [
    {
      "tier": "Free",
      "price": "$0",
      "desc": "3 plans/month"
    },
    {
      "tier": "Plus",
      "price": "$9/mo",
      "desc": "Unlimited, grocery list"
    },
    {
      "tier": "Pro",
      "price": "$29/mo",
      "desc": "Calorie-targeted, recipes"
    }
  ],
  mock: (inputs: Record<string, string>): string => {
  const goal = inputs['goal'] || 'Lose weight'
  const restrict = inputs['restrict'] || 'No nuts'
  return `WEEKLY MEAL PLAN
Goal: ${goal} | Avoid: ${restrict}

Mon: Grilled chicken + greens
Tue: Salmon + quinoa
Wed: Veggie stir-fry (no nuts)
Thu: Turkey wrap + salad
Fri: Lentil soup + toast
Sat: Baked fish + veg
Sun: Chicken bowl

---
(Mock plan. Add OPENAI_API_KEY for calorie-targeted, recipe-linked plans.)`
  },
  geoFaq: [
{ q: "What is MealPlanner?", a: "MealPlanner is a tool that builds a 7-day meal plan from your goal and dietary restrictions." },
{ q: "How long is the plan?", a: "It produces a 7-day meal plan." },
{ q: "Does it respect my diet?", a: "Yes. It respects the dietary restrictions you set." },
{ q: "Are the meals complicated?", a: "The meals are kept simple so you can actually cook them." },
{ q: "Can I print it?", a: "The plan is copy-or-print for the kitchen or grocery run." },
{ q: "Who should use it?", a: "People who want to eat better without the spreadsheet and the planning overhead." }
  ],

}
