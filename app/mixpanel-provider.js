'use client';
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import { useUser } from '@/app/provider';

export default function MixpanelProvider() {
    useEffect(() => {
        mixpanel.init("be212fa365063e4fa0e810457257c17b", {
            debug: true,
            track_pageview: true,
            persistence: "localStorage",
            autocapture: {
                pageview: "full-url",
                click: true,
                input: true,
                scroll: true,
                submit: true,
                capture_text_content: false,
            },
            record_sessions_percent: 100
        });
        mixpanel.start_session_recording();
    }, []);

    return null;
}
