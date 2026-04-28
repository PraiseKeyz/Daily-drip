"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { 
  Search,
  MessageCircle,
  Mail,
  FileText,
  BookOpen,
  Droplets,
  Wallet,
  Shield,
  Clock,
  HelpCircle,
  ExternalLink,
  Send
} from "lucide-react"

const faqCategories = [
  {
    icon: Droplets,
    title: "Envelopes & Drips",
    description: "How envelope budgeting works",
  },
  {
    icon: Wallet,
    title: "Wallet & Funds",
    description: "Managing your money",
  },
  {
    icon: Clock,
    title: "Scheduling",
    description: "Daily drip timing",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Keeping your account safe",
  },
]

const faqs = [
  {
    question: "What is an envelope in DailyDrip?",
    answer: "An envelope is a budget category where you allocate a specific amount of money for a set period (usually monthly). The key feature is that the money is 'locked' and only released to your spendable wallet in small daily or weekly portions, helping you avoid overspending early in the month.",
  },
  {
    question: "How does the daily drip work?",
    answer: "When you create an envelope, DailyDrip calculates your daily allowance by dividing the total amount by the number of days. At midnight (or your chosen time), your daily portion is automatically moved from 'locked' to 'available' balance. You'll receive a notification when this happens.",
  },
  {
    question: "Can I access my locked funds before they're released?",
    answer: "The whole point of DailyDrip is to help you develop better spending habits by keeping money locked. While you can pause or delete an envelope to access funds, we encourage you to stick to the plan for best results. Think of it as a commitment to yourself!",
  },
  {
    question: "What happens to unused daily allowance?",
    answer: "Unused allowance stays in your available balance and accumulates. So if you don't spend your NGN 1,000 transport allowance today, tomorrow you'll have NGN 2,000 available. This rewards you for not spending!",
  },
  {
    question: "Can I have multiple envelopes?",
    answer: "Yes! You can create as many envelopes as you need. Common categories include Transport, Food, Entertainment, Shopping, and Utilities. Each envelope has its own budget and drip schedule.",
  },
  {
    question: "How do I add money to my DailyDrip wallet?",
    answer: "You can add funds via card payment, bank transfer, or through your virtual account number. Funds added directly to your wallet are immediately spendable. To lock funds for disciplined spending, allocate them to an envelope.",
  },
  {
    question: "Is my money safe with DailyDrip?",
    answer: "Yes! Your funds are held securely with our banking partners. We use bank-grade encryption and security measures. Additionally, we offer 2FA and transaction PINs for extra protection.",
  },
  {
    question: "Can I change the drip time?",
    answer: "Yes, you can customize when your daily drips are released in Settings > Notifications > Drip Schedule. Options include midnight (12 AM), early morning (6 AM), or morning (9 AM).",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight">How can we help?</h1>
        <p className="text-muted-foreground mt-2">
          Search our knowledge base or browse categories below
        </p>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      {!searchQuery && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {faqCategories.map((category) => (
            <Card key={category.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{category.title}</p>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
          <CardDescription>
            {searchQuery 
              ? `${filteredFaqs.length} results for "${searchQuery}"`
              : "Quick answers to common questions"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">
                No results found for your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resources & Contact */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resources</CardTitle>
            <CardDescription>Helpful guides and documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a 
              href="#" 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium">Getting Started Guide</p>
                  <p className="text-sm text-muted-foreground">Learn the basics of DailyDrip</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
            <a 
              href="#" 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="font-medium">Envelope Budgeting 101</p>
                  <p className="text-sm text-muted-foreground">Master the envelope method</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
            <a 
              href="#" 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-chart-5" />
                </div>
                <div>
                  <p className="font-medium">Tips for Success</p>
                  <p className="text-sm text-muted-foreground">Build better money habits</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Support</CardTitle>
            <CardDescription>Still need help? Reach out to us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What do you need help with?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Describe your issue or question..."
                rows={4}
              />
            </div>
            <Button className="w-full gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              We typically respond within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Contact Options */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-sm text-muted-foreground">support@dailydrip.ng</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
