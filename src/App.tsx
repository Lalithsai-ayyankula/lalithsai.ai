/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProfilePhotoProvider } from './context/ProfilePhotoContext';
import { PhotoUploadModal } from './components/PhotoUploadModal';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { IdentitySection } from './sections/IdentitySection';
import { SignaturePipelineSection } from './sections/SignaturePipelineSection';
import { SelectedSystemsSection } from './sections/SelectedSystemsSection';
import { TechnicalUniverseSection } from './sections/TechnicalUniverseSection';
import { EngineeringEvolutionSection } from './sections/EngineeringEvolutionSection';
import { VerifiedProofSection } from './sections/VerifiedProofSection';
import { ContactSection } from './sections/ContactSection';
import { RecruiterModal } from './components/RecruiterModal';
import { ResumeViewerModal } from './components/ResumeViewerModal';

export default function App() {
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <ProfilePhotoProvider>
      <div className="min-h-screen bg-[#080a0f] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
        {/* Navigation Command Bar */}
        <Navigation
          onOpenRecruiter={() => setIsRecruiterModalOpen(true)}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* Main Sections Content */}
        <main className="relative">
          <HeroSection
            onOpenResume={() => setIsResumeModalOpen(true)}
            onOpenRecruiter={() => setIsRecruiterModalOpen(true)}
          />

          <IdentitySection />

          <SignaturePipelineSection />

          <SelectedSystemsSection />

          <TechnicalUniverseSection />

          <EngineeringEvolutionSection />

          <VerifiedProofSection />

          <ContactSection
            onOpenResume={() => setIsResumeModalOpen(true)}
            onOpenRecruiter={() => setIsRecruiterModalOpen(true)}
          />
        </main>

        {/* Recruiter 60-Second Snapshot Modal */}
        <RecruiterModal
          isOpen={isRecruiterModalOpen}
          onClose={() => setIsRecruiterModalOpen(false)}
          onOpenFullResume={() => setIsResumeModalOpen(true)}
        />

        {/* Full Official Formatted Resume Viewer */}
        <ResumeViewerModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />

        {/* Profile Photo Customizer / Upload Modal */}
        <PhotoUploadModal />
      </div>
    </ProfilePhotoProvider>
  );
}


