import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import "./mdx-prose.css";

export type MdxPstoneProps = {
  markdown: string;
};

export const MdxPstone = (props: MdxPstoneProps) => {
  return (
    <article className="pstone m-auto dark:pstone-invert xl:pstone-xl md-post">
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
