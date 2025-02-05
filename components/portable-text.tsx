/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://portabletext.org/
 * 
 * Customizing components
 * https://github.com/portabletext/react-portabletext
 */
import { cn } from "@/lib/utils";
import { urlForImageWithSize } from "@/sanity/lib/utils";
import {
  PortableText,
  PortableTextComponentProps,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import Link from "next/link";
import Image from "next/image";

// maye refrence to components/content/mdx-components.tsx
// support p, heading, list, bold, italic, underline, strikethrough, etc,
// dont support image, code, because it works only for text
export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    types: { 
      // https://github.com/portabletext/react-portabletext?tab=readme-ov-file#types
      image: ({ value }: PortableTextComponentProps<{
        _key: string
        url: string
        dimensions: {
          width: number
          height: number
        }
        lqip?: string
        label?: string
        alt?: string
      }>) => {
        console.log(`image, value:`, value); // value is object, 
        // {
        //   _type: 'image',
        //   _key: '4da517040843',
        //   asset: { _ref: 'image-a1ddbb91a17dfb9943fef64cfa305c1c39bb3fbb-1066x560-png', _type: 'reference' }
        // }
        return (
          <Image
            src={value.url}
            alt={value.alt || ""}
            width={value.dimensions.width}
            height={value.dimensions.height}
            className="rounded-lg border bg-muted"
            priority={true}
          />
        )
      },
    },

    

    block: { // change headings level, h3 at most
      h1: ({ children }) => (
        <h3 className="mb-2 text-xl font-semibold dark:text-foreground">{children}</h3>
      ),
      h2: ({ children }) => (
        <h4 className="mb-2 text-lg font-semibold dark:text-foreground">{children}</h4>
      ),
      h3: ({ children }) => (
        <h5 className="mb-2 text-md font-semibold dark:text-foreground">{children}</h5>
      ),
      h4: ({ children }) => (
        <h6 className="mb-2 text-base font-semibold dark:text-foreground">{children}</h6>
      ),
      h5: ({ children }) => (
        <h6 className="mb-2 text-sm font-semibold dark:text-foreground">{children}</h6>
      ),
      h6: ({ children }) => (
        <h6 className="mb-1 text-xs font-semibold dark:text-foreground">{children}</h6>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground">
          {children}
        </blockquote>
      ),
    },
    marks: {
      em: ({children}) => {
        // text-gray-600 dark:text-foreground
        return (
          <em className="font-semibold dark:text-foreground">{children}</em>
        );
      },

      link: ({ children, value }) => {
        return (
          <Link href={value?.href} target="_blank" rel="noopener"
            className="dark:text-foreground">
            {children}
          </Link>
        );
      },
      strong: ({ children }) => { // fix strong not working in dark mode
        return (
          <strong className="dark:text-foreground">
            {children}
          </strong>
        );
      }
    },
  };

  // prose default to max-width: 65ch, so I set it to max-w-max
  return (
    <div className={["prose max-w-max", className].filter(Boolean).join(" ")}>
      <PortableText components={components} value={value} />
    </div>
  );
}
