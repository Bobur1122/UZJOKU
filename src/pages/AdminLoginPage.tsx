import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter } from
'../components/ui/Card';
export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard', {
        replace: true
      });
    }
  }, [isAdmin]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError(t.admin.invalidCredentials);
    }
  };
  if (isAdmin) {
    return null;
  }
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t.admin.login}</CardTitle>
          <CardDescription>{t.admin.loginDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error &&
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center">
                <AlertCircleIcon className="h-4 w-4 mr-2" />
                {error}
              </div>
            }
            <div className="space-y-2">
              <Label htmlFor="username">{t.admin.username}</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />

            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.admin.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />

            </div>
            <Button type="submit" className="w-full">
              {t.admin.loginBtn}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t pt-6 text-xs text-muted-foreground">
          <p>{t.admin.protectedArea}</p>
        </CardFooter>
      </Card>
    </div>);

}