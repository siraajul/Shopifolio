"use client";

import { useEffect, useState } from "react";
import { useToasts } from "@/components/ui/toast";

export const CookieBanner = () => {
    const { message } = useToasts();
    const [hasConsented, setHasConsented] = useState<boolean | null>(null);

    useEffect(() => {
        // Check local storage for consent on mount
        const storedConsent = localStorage.getItem("cookie_consent");
        setHasConsented(!!storedConsent);
    }, []);

    useEffect(() => {
        // Trigger toast if no consent found
        if (hasConsented === false) {
             message({
                text: "We use cookies to improve your experience. By continuing, you agree to our Privacy Policy.",
                preserve: true, // Keep it visible until action
                action: "Accept",
                onAction: () => {
                    localStorage.setItem("cookie_consent", "true");
                    setHasConsented(true);
                },
             });
        }
    }, [hasConsented, message]);

    return null; // This component handles side-effects (toast triggering) only
};
