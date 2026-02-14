import React, { useState } from 'react';
import { SparklesIcon, CopyIcon, CheckIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { useLanguage } from '../../context/LanguageContext';
export function HeadlineGenerator() {
  const [topic, setTopic] = useState('');
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const generateHeadlines = () => {
    if (!topic.trim()) return;
    const templates = [
    `University Announces ${topic}`,
    `Breaking: ${topic} Confirmed Today`,
    `${topic} Expected to Impact Thousands of Students`,
    `Inside the Truth Behind ${topic}`,
    `University Plans Major Expansion in ${topic}`,
    `Exclusive: ${topic} — What You Need to Know`,
    `${topic}: A New Chapter for University Life`,
    `Why ${topic} Matters for Every Student`,
    `Faculty Reacts to ${topic} Announcement`,
    `The Future of ${topic} on Campus`];

    // Shuffle and pick 5-7
    const shuffled = templates.sort(() => 0.5 - Math.random());
    setHeadlines(shuffled.slice(0, 6));
  };
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/10">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <CardTitle>{t.headline.title}</CardTitle>
        </div>
        <p className="text-muted-foreground">{t.headline.subtitle}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic">{t.headline.topicLabel}</Label>
          <Textarea
            id="topic"
            placeholder={t.headline.topicPlaceholder}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[100px] text-lg" />

        </div>

        <Button
          onClick={generateHeadlines}
          disabled={!topic.trim()}
          className="w-full h-12 text-lg">

          {t.headline.generate}
        </Button>

        {headlines.length > 0 &&
        <div className="space-y-3 mt-8 animate-accordion-down">
            <h3 className="font-semibold text-lg mb-4">
              {t.headline.generated}
            </h3>
            {headlines.map((headline, index) =>
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border hover:border-primary/30 transition-colors group">

                <p className="font-medium text-lg">{headline}</p>
                <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(headline, index)}
              className="ml-4 text-muted-foreground hover:text-primary"
              title={t.headline.copy}>

                  {copiedIndex === index ?
              <CheckIcon className="h-5 w-5 text-green-600" /> :

              <CopyIcon className="h-5 w-5" />
              }
                </Button>
              </div>
          )}
          </div>
        }
      </CardContent>
    </Card>);

}