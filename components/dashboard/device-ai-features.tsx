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
import { Group, Wrench, Monitor, Sparkles } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";

const deviceAiFeatures = [
  {
    icon: Group,
    title: "Smart Device Grouping",
    description:
      "Automatically categorize devices by behavior patterns and usage similarity.",
    badge: "Active",
    cta: "View Groups",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Wrench,
    title: "Predictive Maintenance",
    description:
      "AI forecasts maintenance needs based on device performance and sensor data.",
    badge: "Active",
    cta: "Maintenance Alerts",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Monitor,
    title: "Auto Device Monitoring",
    description:
      "Intelligent monitoring that adapts thresholds based on device history.",
    badge: "Learning",
    cta: "Monitor Settings",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

export function DeviceAiFeatures() {
  return (
    <div>
      <div className='flex items-center gap-2 mb-6'>
        <Sparkles className='h-5 w-5 text-primary' />
        <h2 className='text-xl font-semibold'>Device AI</h2>
        <Badge variant='outline' className='text-xs'>
          Smart Management
        </Badge>
      </div>

      <StaggerContainer
        staggerDelay={0.1}
        className='grid gap-4 md:grid-cols-3'
      >
        {deviceAiFeatures.map((feature) => (
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
