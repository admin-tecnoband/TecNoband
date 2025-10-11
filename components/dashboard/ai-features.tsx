"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertCircle, Group, Sparkles } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

const aiFeatures = [
  {
    icon: Brain,
    title: "Anomaly Detection",
    description:
      "AI-powered detection of unusual device behavior patterns before they become critical issues.",
    badge: "Active",
    cta: "View Anomalies",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Predictive Maintenance",
    description:
      "Machine learning forecasts device failures and recommends maintenance schedules.",
    badge: "Learning",
    cta: "Maintenance Insights",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: AlertCircle,
    title: "Smart Alert Summarization",
    description:
      "Automatically groups and summarizes related alerts to reduce notification noise.",
    badge: "Active",
    cta: "Alert Summary",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Group,
    title: "Auto Device Grouping",
    description:
      "Intelligently categorizes devices based on behavior patterns and usage.",
    badge: "Beta",
    cta: "View Groups",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

interface AiFeaturesProps {
  variant?: "full" | "condensed";
  className?: string;
}

export function AiFeatures({
  variant = "full",
  className = "",
}: AiFeaturesProps) {
  const features =
    variant === "condensed" ? aiFeatures.slice(0, 2) : aiFeatures;

  return (
    <div className={className}>
      <div className='flex items-center gap-2 mb-6'>
        <Sparkles className='h-5 w-5 text-primary' />
        <h2 className='text-xl font-semibold'>AI-Powered Features</h2>
        <Badge variant='outline' className='text-xs'>
          Powered by Machine Learning
        </Badge>
      </div>

      <StaggerContainer
        staggerDelay={0.1}
        className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'
      >
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <Card className='h-full hover:shadow-lg transition-all border-2 hover:border-primary/20'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <div
                    className={`h-10 w-10 rounded-lg ${feature.bgColor} flex items-center justify-center`}
                  >
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <Badge
                    variant={
                      feature.badge === "Active" ? "default" : "secondary"
                    }
                    className='text-xs'
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className='text-lg'>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <CardDescription className='mb-4 text-sm'>
                  {feature.description}
                </CardDescription>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full hover:bg-primary hover:text-primary-foreground transition-colors'
                  onClick={() =>
                    alert(`${feature.title} feature - Coming soon!`)
                  }
                >
                  {feature.cta}
                </Button>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
