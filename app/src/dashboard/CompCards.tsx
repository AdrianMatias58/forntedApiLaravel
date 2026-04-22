"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps={
    title: string
}
export function CardComp (prop : CardProps){
    const {title} = prop;
    return(
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    )
}

