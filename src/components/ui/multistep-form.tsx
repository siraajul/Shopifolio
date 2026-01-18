"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, ChevronLeft, Loader2, Sparkles } from "lucide-react";
import { useToasts } from "@/components/ui/toast";

// ----------------------------------------------------------------------
// FORM DATA TYPE
// ----------------------------------------------------------------------
export type FormData = {
  // Personal
  name: string;
  email: string;
  company: string;
  
  // Step 1: Project Type
  projectType: string;

  // Step 2: Dynamic Details
  // Common
  niche: string;
  // New Store
  productCount: string;
  referenceStores: string; // "Make it look like Gymshark"
  // Migration
  currentPlatform: string;
  migrationScope: string[]; // Products, Orders, Reviews etc
  // Redesign / Speed
  currentUrl: string;
  painPoint: string; // "Slow speed", "Bad UX"
  // Marketing
  growthGoal: string; // "SEO", "Ads"
  marketingBudget: string;
  // Custom Dev
  devScope: string; // "App integration", "Custom section"
  hasDesign: string; // "Yes", "No"

  // Step 3: Features (For New Store / Redesign / Custom)
  features: string[];
  
  // Step 4: Budget & Timeline
  budget: string;
  timeline: string;
  
  // Extra
  additionalInfo: string;
};

const INITIAL_DATA: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  
  niche: "",
  productCount: "",
  referenceStores: "",
  currentPlatform: "",
  migrationScope: [],
  currentUrl: "",
  painPoint: "",
  growthGoal: "",
  marketingBudget: "",
  devScope: "",
  hasDesign: "",

  features: [],
  budget: "",
  timeline: "",
  additionalInfo: "",
};


// ----------------------------------------------------------------------
// ANIMATION VARIANTS
// ----------------------------------------------------------------------
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    filter: "blur(10px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    filter: "blur(10px)",
  }),
};

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export default function OnboardingForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error: errorToast } = useToasts();

  // Helper to update fields
  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (listName: 'features' | 'migrationScope', feature: string) => {
    setFormData((prev) => {
      const list = prev[listName] as string[];
      const exists = list.includes(feature);
      if (exists) {
        return { ...prev, [listName]: list.filter((f) => f !== feature) };
      } else {
        return { ...prev, [listName]: [...list, feature] };
      }
    });
  };

  // Steps Configuration
  const steps = [
    {
      id: "intro",
      title: "Project Type",
      description: "What are we building today?",
      isValid: () => !!formData.projectType,
    },
    {
      id: "details",
      title: "Project Details",
      description: "Tell us about your requirements.",
      isValid: () => {
        const pt = formData.projectType;
        if (pt === "New Store") return !!formData.niche && !!formData.productCount;
        if (pt === "Migration") return !!formData.currentPlatform;
        if (pt === "Redesign") return !!formData.currentUrl && !!formData.painPoint;
        if (pt === "Speed Optimization") return !!formData.currentUrl;
        if (pt === "Marketing") return !!formData.growthGoal;
        if (pt === "Custom Dev") return !!formData.devScope;
        return false;
      },
    },
    {
      id: "features",
      title: "Features & Scope",
      description: "Specific needs for your store.",
      isValid: () => true, // Optional
    },
    {
      id: "logistics",
      title: "Budget & Timeline",
      description: "Help us understand your scope.",
      isValid: () => !!formData.budget && !!formData.timeline,
    },
    {
      id: "contact",
      title: "Contact Info",
      description: "Where should we send the proposal?",
      isValid: () => !!formData.name && !!formData.email,
    },
  ];

  // Navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        success("Inquiry Sent! We'll be in touch shortly.");
        // Optional: Reset form or redirect
      } else {
        console.error("Submission error:", data);
        errorToast("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      errorToast("Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI Components per Step
  const renderStepContent = (stepId: string) => {
    switch (stepId) {
      // -------------------------------------------------------------
      // STEP 1: PROJECT TYPE
      // -------------------------------------------------------------
      case "intro":
        return (
          <div className="space-y-6">
            <RadioGroup
              value={formData.projectType}
              onValueChange={(val) => updateField("projectType", val)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { value: "New Store", label: "New Store Setup", desc: "Build a brand new Shopify store." },
                { value: "Redesign", label: "Redesign / Revamp", desc: "Improve design & conversion." },
                { value: "Migration", label: "Migration", desc: "Move from Wix/Woo/Etsy." },
                { value: "Speed Optimization", label: "Speed Optimization", desc: "Fix Core Web Vitals & Loading." },
                { value: "Marketing", label: "Marketing / SEO", desc: "Ads, Email, & Organic Growth." },
                { value: "Custom Dev", label: "Custom Development", desc: "Specific features or Liquid code." },
              ].map((opt) => (
                <div key={opt.value}>
                  <RadioGroupItem value={opt.value} id={opt.value} className="peer sr-only" />
                  <Label
                    htmlFor={opt.value}
                    className="flex flex-col justify-between p-6 h-full bg-muted/30 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50 rounded-xl cursor-pointer transition-all"
                  >
                    <span className="font-semibold text-lg">{opt.label}</span>
                    <span className="text-muted-foreground font-normal mt-2 text-sm">{opt.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      // -------------------------------------------------------------
      // STEP 2: DYNAMIC DETAILS
      // -------------------------------------------------------------
      case "details":
        const pt = formData.projectType;

        // --- NEW STORE ---
        if (pt === "New Store") {
             return (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Industry / Niche</Label>
                    <Select value={formData.niche} onValueChange={(val) => updateField("niche", val)}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Select Industry" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fashion">Fashion & Apparel</SelectItem>
                        <SelectItem value="Beauty">Beauty & Cosmetics</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Home">Home & Decor</SelectItem>
                        <SelectItem value="Food">Food & Beverage</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label>Product Count</Label>
                    <Select value={formData.productCount} onValueChange={(val) => updateField("productCount", val)}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Catalog Size" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1 - 10 Products</SelectItem>
                        <SelectItem value="10-100">10 - 100 Products</SelectItem>
                        <SelectItem value="100+">100+ Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Design References</Label>
                  <Textarea 
                    placeholder="Reference URLs (e.g. gymshark.com) or describe the vibe."
                    className="min-h-[100px] bg-background/50"
                    value={formData.referenceStores}
                    onChange={(e) => updateField("referenceStores", e.target.value)}
                  />
                </div>
              </div>
            );
        }

        // --- MIGRATION ---
        if (pt === "Migration") {
            return (
                <div className="space-y-6">
                     <div className="space-y-3">
                        <Label>Current Platform</Label>
                        <Select value={formData.currentPlatform} onValueChange={(val) => updateField("currentPlatform", val)}>
                            <SelectTrigger className="h-12"><SelectValue placeholder="Where are you moving from?" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="WordPress/Woo">WordPress / WooCommerce</SelectItem>
                                <SelectItem value="Wix">Wix</SelectItem>
                                <SelectItem value="Squarespace">Squarespace</SelectItem>
                                <SelectItem value="Magento">Magento / Adobe Commerce</SelectItem>
                                <SelectItem value="Etsy">Etsy</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-3">
                        <Label>What data needs to move?</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["Products", "Customer Data", "Orders History", "Blog Posts", "Reviews"].map((item) => (
                                <div key={item} onClick={() => toggleFeature('migrationScope', item)}
                                   className={cn(
                                    "flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                    formData.migrationScope?.includes(item) ? "border-primary bg-primary/5" : "border-border bg-muted/20"
                                  )}
                                >
                                    <Checkbox checked={formData.migrationScope?.includes(item)} className="pointer-events-none"/>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        // --- REDESIGN / SPEED ---
        if (pt === "Redesign" || pt === "Speed Optimization") {
             return (
                <div className="space-y-6">
                     <div className="space-y-3">
                        <Label>Current Store URL</Label>
                        <Input 
                            value={formData.currentUrl} 
                            onChange={(e) => updateField("currentUrl", e.target.value)}
                            placeholder="https://mystore.com"
                            className="h-12 bg-background/50"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label>{pt === "Redesign" ? "Main Pain Point" : "Current Performance Issue"}</Label>
                        <Textarea 
                            placeholder={pt === "Redesign" 
                                ? "e.g. Conversion rate is low, Design looks outdated, Mobile UX is bad..." 
                                : "e.g. Failed Core Web Vitals, Slow checkout, High bounce rate..."}
                            className="min-h-[120px] bg-background/50"
                            value={formData.painPoint}
                            onChange={(e) => updateField("painPoint", e.target.value)}
                        />
                    </div>
                </div>
             )
        }
        
        // --- MARKETING ---
        if (pt === "Marketing") {
             return (
                <div className="space-y-6">
                    <div className="space-y-3">
                        <Label>Primary Focus</Label>
                        <Select value={formData.growthGoal} onValueChange={(val) => updateField("growthGoal", val)}>
                            <SelectTrigger className="h-12"><SelectValue placeholder="Select Goal" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SEO">SEO Ranking</SelectItem>
                                <SelectItem value="Ads">Facebook / Instagram Ads</SelectItem>
                                <SelectItem value="Email">Email Marketing (Klaviyo)</SelectItem>
                                <SelectItem value="Strategy">Full Strategy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-3">
                        <Label>Monthly Ad/Marketing Budget</Label>
                         <Select value={formData.marketingBudget} onValueChange={(val) => updateField("marketingBudget", val)}>
                            <SelectTrigger className="h-12"><SelectValue placeholder="Per Month" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="< $1k">Less than $1,000</SelectItem>
                                <SelectItem value="$1k - $3k">$1,000 - $3,000</SelectItem>
                                <SelectItem value="$3k - $10k">$3,000 - $10,000</SelectItem>
                                <SelectItem value="$10k+">$10,000+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
             )
        }

        // --- CUSTOM DEV ---
        return (
            <div className="space-y-6">
                <div className="space-y-3">
                    <Label>Scope of Work</Label>
                    <Textarea 
                        placeholder="Describe the feature, section, or app integration you need..."
                        className="min-h-[120px] bg-background/50"
                        value={formData.devScope}
                        onChange={(e) => updateField("devScope", e.target.value)}
                    />
                </div>
                 <div className="space-y-3">
                    <Label>Do you have designs ready?</Label>
                    <RadioGroup
                        value={formData.hasDesign}
                        onValueChange={(val) => updateField("hasDesign", val)}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                        {["Yes (Figma/XD)", "Partial / Ideas", "No, I need Design"].map((opt) => (
                             <div key={opt}>
                                <RadioGroupItem value={opt} id={opt} className="peer sr-only" />
                                <Label htmlFor={opt} className="flex items-center justify-center p-4 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 bg-muted/30 hover:bg-muted/50 rounded-xl cursor-pointer font-medium text-sm text-center">
                                    {opt}
                                </Label>
                             </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        );

      // -------------------------------------------------------------
      // STEP 3: FEATURES (Context Aware)
      // -------------------------------------------------------------
      case "features":
        // Skip features step for purely service based things if needed, or show relevant ones
        const featuresList = [
            "Subscriptions",
            "Bundles / Upsells",
            "B2B / Wholesale",
            "Multi-Currency",
            "Mega Menu",
            "Loyalty Program",
            "Advanced Search",
            "Pre-Orders"
        ];
        
        return (
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuresList.map((feature) => (
                <div
                  key={feature}
                  onClick={() => toggleFeature('features', feature)}
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    formData.features.includes(feature)
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/20 hover:bg-muted/40"
                  )}
                >
                  <Checkbox 
                     checked={formData.features.includes(feature)}
                     className="pointer-events-none" 
                  />
                  <span className="font-medium text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
             <div className="text-sm text-muted-foreground text-center">
                Select any that apply. This helps us estimate complexity.
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // STEP 4: BUDGET & TIMELINE
      // -------------------------------------------------------------
      case "logistics":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">One-time Project Budget</Label>
              <RadioGroup
                value={formData.budget}
                onValueChange={(val) => updateField("budget", val)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {["$500 - $1k", "$1k - $3k", "$3k - $8k", "$8k+"].map((opt) => (
                  <div key={opt}>
                    <RadioGroupItem value={opt} id={`budget-${opt}`} className="peer sr-only" />
                    <Label
                      htmlFor={`budget-${opt}`}
                      className="flex items-center justify-center p-4 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 bg-muted/30 hover:bg-muted/50 rounded-xl cursor-pointer transition-all font-medium"
                    >
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold">Target Timeline</Label>
              <RadioGroup
                value={formData.timeline}
                onValueChange={(val) => updateField("timeline", val)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {["ASAP (< 2 weeks)", "2-4 Weeks", "1 Month +"].map((opt) => (
                  <div key={opt}>
                    <RadioGroupItem value={opt} id={`time-${opt}`} className="peer sr-only" />
                    <Label
                      htmlFor={`time-${opt}`}
                      className="flex items-center justify-center p-4 border-2 border-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 bg-muted/30 hover:bg-muted/50 rounded-xl cursor-pointer transition-all font-medium"
                    >
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
               <Label>Additional Notes (Optional)</Label>
               <Textarea
                 value={formData.additionalInfo}
                 onChange={(e) => updateField("additionalInfo", e.target.value)}
                 placeholder="Any specific functionalities or questions?"
                 className="min-h-[80px]"
               />
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // STEP 5: CONTACT
      // -------------------------------------------------------------
      case "contact":
        return (
          <div className="space-y-6">
            <div className="space-y-4 text-center mb-8">
               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
               </div>
               <h3 className="text-2xl font-bold">Almost there!</h3>
               <p className="text-muted-foreground">Where should we send your custom proposal?</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Project / Company Name (Optional)</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="e.g. My Brand LLC"
                  className="h-12 bg-background/50"
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Your Name</Label>
                    <Input
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="John Doe"
                    className="h-12 bg-background/50"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john@example.com"
                    className="h-12 bg-background/50"
                    />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };


  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar (Optional) */}
      <div className="mb-8 flex items-center justify-between px-2">
        {steps.map((s, i) => (
           <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
              <div 
                className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                    i <= currentStep ? "bg-primary border-primary text-black" : "bg-background border-muted text-muted-foreground"
                )}
              >
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={cn(
                  "text-[10px] md:text-xs font-medium uppercase tracking-wider absolute -bottom-6 w-32 text-center transition-colors duration-300 hidden md:block",
                   i === currentStep ? "text-primary" : "text-muted-foreground/50"
              )}>
                  {s.title}
              </span>
           </div>
        ))}
        {/* Progress Line Background */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-muted -z-0 hidden md:block" />
      </div>

      <Card className="p-1 border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden mt-12">
        {/* Step Content Container */}
        <div className="p-6 md:p-10 min-h-[400px] flex flex-col relative">
           
           <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground text-lg">{steps[currentStep].description}</p>
           </div>

            {/* Animated Step Content */}
            <div className="flex-grow relative">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full h-full"
                    >
                        {renderStepContent(steps[currentStep].id)}
                    </motion.div>
                </AnimatePresence>
            </div>

           {/* Navigation Buttons */}
           <div className="mt-12 flex items-center justify-between pt-6 border-t border-white/5">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
                className={cn("text-muted-foreground hover:text-foreground pl-0 hover:bg-transparent", currentStep === 0 && "invisible")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={nextStep}
                disabled={!steps[currentStep].isValid() || isSubmitting}
                className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20"
                size="lg"
              >
                {isSubmitting ? (
                    <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                    </>
                ) : currentStep === steps.length - 1 ? (
                    "Submit Request"
                ) : (
                    <>
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                )}
              </Button>
           </div>
        </div>
      </Card>
    </div>
  );
}
