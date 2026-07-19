import { Fragment } from "react";

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-${i}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

export function MarkdownLite({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);

  return (
    <div className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
      {blocks.map((block, i) => {
        const key = `block-${i}`;

        if (block.startsWith("```")) {
          const code = block.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
          return (
            <pre
              key={key}
              className="overflow-x-auto rounded-xl border border-border/60 bg-[#0b0b0f] p-4 font-mono text-[13px] leading-relaxed text-white/85"
            >
              <code>{code}</code>
            </pre>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 key={key} className="pt-3 text-2xl font-semibold text-foreground">
              {renderInline(block.slice(3), key)}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3 key={key} className="pt-2 text-xl font-semibold text-foreground">
              {renderInline(block.slice(4), key)}
            </h3>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={key}
              className="border-l-2 border-brand pl-4 text-base italic text-foreground/80"
            >
              {renderInline(block.slice(2), key)}
            </blockquote>
          );
        }

        return (
          <p key={key} className="text-base sm:text-lg">
            {renderInline(block, key)}
          </p>
        );
      })}
    </div>
  );
}
