import MobileClaimArtwork from 'Components/entities/events/MobileClaimArtwork'
import { EventProvider } from 'Components/entities/events/useEventContext'
import React from 'react'

export default function claimArtwork() {
    return (
        <div>
            <EventProvider>
                <MobileClaimArtwork />
            </EventProvider>
        </div>
    )
}
