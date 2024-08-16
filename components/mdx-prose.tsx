import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import "./mdx-prose.css";

export type MdxProseProps = {
  markdown: string;
};

export const MdxProse = (props: MdxProseProps) => {
  return (
    <article className="prose m-auto dark:prose-invert xl:prose-xl md-post">
      <MDXRemote
        options={{
          mdxOptions: {
            //@ts-ignore
            rehypePlugins: [rehypePrism],
          },
        }}
        source={props.markdown}
      />
    </article>
  );
};
