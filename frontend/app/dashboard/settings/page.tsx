"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { 
  User,
  Bell,
  Shield,
  Palette,
  Clock,
  Smartphone,
  Mail,
  Camera,
  Check,
  ChevronRight,
  LogOut,
  Trash2,
  Key,
  Globe,
  Moon,
  Sun
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and app settings
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-56 flex-shrink-0">
          <TabsList className="flex lg:flex-col h-auto w-full bg-transparent gap-1 p-0">
            <TabsTrigger 
              value="profile" 
              className="justify-start gap-2 w-full data-[state=active]:bg-muted"
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="justify-start gap-2 w-full data-[state=active]:bg-muted"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className="justify-start gap-2 w-full data-[state=active]:bg-muted"
            >
              <Palette className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="justify-start gap-2 w-full data-[state=active]:bg-muted"
            >
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Profile Tab */}
          <TabsContent value="profile" className="m-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Information</CardTitle>
                <CardDescription>Update your personal details and photo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+234 812 345 6789" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="m-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <NotificationSetting
                    title="Daily Drip Notifications"
                    description="Get notified when your daily drip is released"
                    icon={Clock}
                    defaultEnabled={true}
                  />
                  <Separator />
                  <NotificationSetting
                    title="Spending Alerts"
                    description="Alerts when you log a spending transaction"
                    icon={Mail}
                    defaultEnabled={true}
                  />
                  <Separator />
                  <NotificationSetting
                    title="Low Balance Warnings"
                    description="Warning when available balance is running low"
                    icon={Bell}
                    defaultEnabled={true}
                  />
                  <Separator />
                  <NotificationSetting
                    title="Weekly Summary"
                    description="Receive a weekly spending summary report"
                    icon={Mail}
                    defaultEnabled={false}
                  />
                  <Separator />
                  <NotificationSetting
                    title="Push Notifications"
                    description="Enable push notifications on your device"
                    icon={Smartphone}
                    defaultEnabled={true}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Drip Schedule</CardTitle>
                <CardDescription>Set when your daily drips are released</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Release Time</p>
                    <p className="text-sm text-muted-foreground">
                      Time when daily drips become available
                    </p>
                  </div>
                  <Select defaultValue="midnight">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midnight">12:00 AM</SelectItem>
                      <SelectItem value="early">6:00 AM</SelectItem>
                      <SelectItem value="morning">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="m-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Customize how DailyDrip looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Theme</p>
                      <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                    </div>
                  </div>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Currency Display</p>
                      <p className="text-sm text-muted-foreground">How amounts are displayed</p>
                    </div>
                  </div>
                  <Select defaultValue="ngn">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ngn">NGN (N)</SelectItem>
                      <SelectItem value="ngn-full">NGN (Full)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Data & Privacy</CardTitle>
                <CardDescription>Manage your data preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Export Data</p>
                    <p className="text-sm text-muted-foreground">
                      Download all your transaction data
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-muted-foreground">
                      Help us improve by sharing usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="m-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Password & Authentication</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Check className="h-3 w-3" />
                    Enabled
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Transaction PIN</p>
                      <p className="text-sm text-muted-foreground">Required for transfers and spending</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change PIN</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sessions</CardTitle>
                <CardDescription>Manage your active sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">iPhone 15 Pro</p>
                      <p className="text-sm text-muted-foreground">Lagos, Nigeria · Active now</p>
                    </div>
                  </div>
                  <Badge>Current</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Chrome on MacOS</p>
                      <p className="text-sm text-muted-foreground">Lagos, Nigeria · 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Revoke
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Log out everywhere</p>
                    <p className="text-sm text-muted-foreground">
                      Sign out from all devices
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Log Out All
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function NotificationSetting({ 
  title, 
  description, 
  icon: Icon, 
  defaultEnabled 
}: { 
  title: string
  description: string
  icon: typeof Bell
  defaultEnabled: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultEnabled} />
    </div>
  )
}
