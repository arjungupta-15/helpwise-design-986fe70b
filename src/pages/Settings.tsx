import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Bell, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and notification settings.
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          Profile Information
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@company.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
        </div>
      </Card>

      {/* Email Notifications */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          Email Notifications
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-new-ticket" className="text-base font-medium">
                New Ticket Created
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive an email when a new ticket is created
              </p>
            </div>
            <Switch id="email-new-ticket" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-status" className="text-base font-medium">
                Ticket Status Updates
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get notified when ticket status changes
              </p>
            </div>
            <Switch id="email-status" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-resolved" className="text-base font-medium">
                Ticket Resolved
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Email notification when your ticket is resolved
              </p>
            </div>
            <Switch id="email-resolved" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-digest" className="text-base font-medium">
                Daily Digest
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive a summary of all ticket activities
              </p>
            </div>
            <Switch id="email-digest" />
          </div>
        </div>
      </Card>

      {/* SMS Notifications */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-success" />
          </div>
          SMS Notifications
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-critical" className="text-base font-medium">
                Critical Tickets
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                SMS alert for critical priority tickets
              </p>
            </div>
            <Switch id="sms-critical" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-assigned" className="text-base font-medium">
                Ticket Assigned
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                SMS when a ticket is assigned to you
              </p>
            </div>
            <Switch id="sms-assigned" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-resolved" className="text-base font-medium">
                Ticket Resolved
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                SMS notification when ticket is resolved
              </p>
            </div>
            <Switch id="sms-resolved" />
          </div>
        </div>
      </Card>

      {/* Push Notifications */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
            <Bell className="w-4 h-4 text-warning" />
          </div>
          Push Notifications
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-updates" className="text-base font-medium">
                Ticket Updates
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Browser notifications for ticket updates
              </p>
            </div>
            <Switch id="push-updates" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-mentions" className="text-base font-medium">
                Mentions
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Notify when you're mentioned in comments
              </p>
            </div>
            <Switch id="push-mentions" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
