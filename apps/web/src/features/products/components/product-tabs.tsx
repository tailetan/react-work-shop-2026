import { cn } from "@react-workshop/ui/utils";
import { useState } from "react";
import { Container } from "@/components/container";
import type { ProductDetail } from "@/types/api";

export function ProductTabs({ detail }: { detail: ProductDetail }) {
  const tabs = detail.tabs;
  const [activeKey, setActiveKey] = useState(
    () => tabs.find((tab) => tab.active)?.key ?? tabs[0]?.key ?? ""
  );

  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  if (!activeTab) {
    return null;
  }

  return (
    <section className="border-y border-line py-12">
      <Container max={1026}>
        <div
          className="mb-9 flex flex-wrap justify-center gap-8 text-xl md:gap-14 md:text-2xl"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              aria-controls={`panel-${tab.key}`}
              aria-selected={tab.key === activeTab.key}
              className={cn(
                "transition-colors",
                tab.key === activeTab.key ? "font-medium text-black" : "text-muted hover:text-black"
              )}
              id={`tab-${tab.key}`}
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          aria-labelledby={`tab-${activeTab.key}`}
          className="grid gap-7"
          id={`panel-${activeTab.key}`}
          role="tabpanel"
        >
          {activeTab.content.map((paragraph, index) => (
            <p className="text-justify text-muted" key={index}>
              {paragraph}
            </p>
          ))}
        </div>

        {activeTab.key === "description" && detail.detailImages.length > 0 ? (
          <div className="mt-7 grid gap-7 md:grid-cols-2">
            {detail.detailImages.map((image, index) => (
              <img
                alt=""
                className="h-[240px] w-full rounded-[10px] bg-beige object-cover md:h-[348px]"
                key={`${image}-${index}`}
                loading="lazy"
                src={image}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
