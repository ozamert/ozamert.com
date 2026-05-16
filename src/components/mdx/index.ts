/**
 * MDX component barrel export
 *
 * Import all components from this single entry point in your MDX files:
 *
 * @usage
 * ```mdx
 * import { Callout, ImageFig, VideoEmbed, ArtifactFrame, DataTable, CodeBlock }
 *   from '../../components/mdx/index.ts';
 * ```
 *
 * React chart components are exported separately because they require
 * a client directive (client:load / client:visible) in MDX:
 *
 * ```mdx
 * import ChartLine from '../../components/charts/ChartLine';
 * import ChartBar  from '../../components/charts/ChartBar';
 *
 * <ChartLine client:load data={data} xKey="month" yKey="value" />
 * ```
 */

export { default as Callout }      from './Callout.astro';
export { default as ImageFig }     from './ImageFig.astro';
export { default as VideoEmbed }   from './VideoEmbed.astro';
export { default as ArtifactFrame } from './ArtifactFrame.astro';
export { default as DataTable }    from './DataTable.astro';
export { default as CodeBlock }    from './CodeBlock.astro';
