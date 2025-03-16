"use client";

import { MainLayout } from "@/components/main-layout";
import { Title } from "@/components/title";
import { FormationList } from "@/features/formation";

export default function FormationPage() {
  return (
    <MainLayout>
      <Title label="จับขั้วรัฐบาล '66" />
      <FormationList />
    </MainLayout>
  );
}
