"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type InputFieldProps = {
    label: string;
    type: "text" | "password" | "email";
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
};

function InputField({ label, type, placeholder, value, onChange }: InputFieldProps) {
    return (
        <div className="grid w-full items-center gap-1.5 mb-4">
            <Label htmlFor={label}>{label}</Label>
            <Input 
                id={label}
                type={type} 
                placeholder={placeholder} 
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
type FuncionLoginProps = {
    Login : (email: string, password: string) => void;
    LoginGoogle : () => void;
}
export default function Login({Login, LoginGoogle}:FuncionLoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Login(email, password);
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-100 p-4">
            <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-red-600">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Hospital San José
                    </CardTitle>
                    <CardDescription className="text-center">
                        Acceso al panel administrativo
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    {/* --- BOTÓN DE GOOGLE --- */}
                    <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={LoginGoogle}
                    >
                        {/* Aquí puedes usar un SVG del logo de Google para que sea más real */}
                        <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Continuar con Google
                    </Button>

                    {/* Divisor visual */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground text-[10px]">O usar correo institucional</span>
                        </div>
                    </div>

                    <form onSubmit={handSubmit}>
                        <InputField 
                            label="Correo Electrónico" 
                            type="email" 
                            placeholder="empleado@hospital.com" 
                            value={email}
                            onChange={setEmail}
                        />
                        <InputField 
                            label="Contraseña" 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={setPassword}
                        />
                        <Button type="submit" className="w-full mt-2 bg-red-600 hover:bg-red-700">
                            Entrar al Sistema
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                    <Button variant="link" className="text-xs text-blue-600">
                        ¿No tienes cuenta? Solicita acceso aquí
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}