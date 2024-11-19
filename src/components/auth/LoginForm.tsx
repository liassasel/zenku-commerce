'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { signIn, isAdmin } = useAuth()
    const router = useRouter()

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
        await signIn(email, password)
        if (isAdmin) {
        router.push('/admin/products')
        } else {
        setError('No tienes permisos de administrador')
        }
    } catch (error) {
        setError('Credenciales inválidas. Por favor, intente de nuevo.')
    } finally {
        setIsLoading(false)
    }
    }

    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
            Ingrese sus credenciales para acceder al panel de administración
            </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
            {error && (
                <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="correo@ejemplo.com"
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                />
            </div>
            </CardContent>
            <CardFooter>
            <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
            >
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                </>
                ) : (
                'Iniciar Sesión'
                )}
            </Button>
            </CardFooter>
        </form>
        </Card>
    </div>
    )
}