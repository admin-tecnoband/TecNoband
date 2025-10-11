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
import {
  Brain,
  TrendingUp,
  AlertCircle,
  Group,
  Sparkles,
  Wrench,
  Monitor,
} from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

const overviewAiFeatures = [
  {
    icon: Brain,
    title: "Anomaly Detection",
    description: "AI-powered detection of unusual device behavior patterns.",
    badge: "Active",
    cta: "View Anomalies",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Machine learning forecasts for device performance and trends.",
    badge: "Active",
    cta: "View Insights",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: AlertCircle,
    title: "Smart Alert Management",
    description: "Intelligent grouping and summarization of device alerts.",
    badge: "Active",
    cta: "Alert Summary",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Group,
    title: "Auto Device Grouping",
    description:
      "Automatically categorizes devices by behavior and usage patterns.",
    badge: "Active",
    cta: "View Groups",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Wrench,
    title: "Predictive Maintenance",
    description: "AI forecasts maintenance needs before issues occur.",
    badge: "Learning",
    cta: "Maintenance Hub",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Monitor,
    title: "Smart Monitoring",
    description: "Adaptive monitoring that learns from your device patterns.",
    badge: "Active",
    cta: "Monitor Settings",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

export function OverviewAiFeatures() {
  return (
    <div>
      <div className='flex items-center gap-2 mb-6'>
        <Sparkles className='h-5 w-5 text-primary' />
        <h2 className='text-xl font-semibold'>AI-Powered Intelligence</h2>
        <Badge variant='outline' className='text-xs'>
          Full Suite Available
        </Badge>
      </div>

      <StaggerContainer
        staggerDelay={0.05}
        className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'
      >
        {overviewAiFeatures.map((feature) => (
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
                  onClick={() => alert(`${feature.title} - Coming soon!`)}
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
