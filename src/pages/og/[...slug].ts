import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

type PageEntry = {
  title: string;
  description?: string;
  category?: string;
};

async function buildPages(): Promise<Record<string, PageEntry>> {
  const [dataEng, dataSci, mlEng, hobbies, labNotes, podcast, projects] = await Promise.all([
    getCollection('data-engineering'),
    getCollection('data-science'),
    getCollection('ml-engineering'),
    getCollection('hobbies'),
    getCollection('labNotes'),
    getCollection('podcast'),
    getCollection('projects'),
  ]);

  const pages: Record<string, PageEntry> = {};

  for (const p of dataEng) {
    pages[`data-engineering/${p.id}`] = {
      title: p.data.title,
      description: p.data.summary,
      category: 'Data Engineering',
    };
  }
  for (const p of dataSci) {
    pages[`data-science/${p.id}`] = {
      title: p.data.title,
      description: p.data.summary,
      category: 'Data Science',
    };
  }
  for (const p of mlEng) {
    pages[`ml-engineering/${p.id}`] = {
      title: p.data.title,
      description: p.data.summary,
      category: 'ML Engineering',
    };
  }
  for (const p of hobbies) {
    const sub = p.data.sub;
    const id = p.id.replace(/^(travel|music|languages)\//, '');
    pages[`${sub}/${id}`] = {
      title: p.data.title,
      description: p.data.summary,
      category: sub.charAt(0).toUpperCase() + sub.slice(1),
    };
  }
  for (const p of labNotes) {
    pages[`lab-notes/${p.id}`] = {
      title: p.data.title,
      description: p.data.context,
      category: 'Lab Notes',
    };
  }
  for (const p of podcast) {
    pages[`podcast/${p.id}`] = {
      title: p.data.title,
      description: p.data.summary,
      category: 'Podcast',
    };
  }
  for (const p of projects) {
    pages[`projects/${p.id}`] = {
      title: p.data.title,
      description: p.data.impact,
      category: 'Project',
    };
  }

  // Static page OGs
  pages['index'] = { title: 'ozamert', description: 'Personal blog by Mert Öztürk — data, ML, languages.', category: 'Home' };
  pages['about'] = { title: 'About', description: 'Data engineer based in Istanbul. Learning out loud.', category: 'About' };
  pages['data-engineering-index'] = { title: 'Data Engineering', description: 'Pipelines, warehouses, MLOps, infrastructure', category: 'Section' };
  pages['data-science-index'] = { title: 'Data Science', description: 'Models, analysis, baselines, decisions', category: 'Section' };
  pages['ml-engineering-index'] = { title: 'ML Engineering', description: 'Training, fine-tuning, inference, deployment', category: 'Section' };
  pages['travel-index'] = { title: 'Travel', description: 'Trips, itineraries, travel notes', category: 'Section' };
  pages['music-index'] = { title: 'Music', description: 'Guitar practice logs and ear training', category: 'Section' };
  pages['languages-index'] = { title: 'Languages', description: 'Spanish, German, Japanese — learning out loud', category: 'Section' };
  pages['photos-index'] = { title: 'Photos', description: 'Travel and street photography', category: 'Section' };
  pages['podcast-index'] = { title: 'Podcast', description: 'Things I listen to + my own episodes', category: 'Section' };
  pages['demos-index'] = { title: 'Demos', description: 'Live prototypes from open-design and experiments', category: 'Section' };
  pages['projects-index'] = { title: 'Projects', description: 'Things I am building', category: 'Section' };

  return pages;
}

const allPages = await buildPages();

const route = await OGImageRoute({
  param: 'slug',
  pages: allPages,
  getImageOptions: (_path, page: PageEntry) => ({
    title: page.title,
    description: page.description ?? '',
    bgGradient: [[5, 5, 5]],
    padding: 80,
    font: {
      title: {
        size: 64,
        families: ['Inter'],
        weight: 'Bold',
        color: [229, 231, 235],
        lineHeight: 1.15,
      },
      description: {
        size: 28,
        families: ['Inter'],
        weight: 'Normal',
        color: [136, 136, 136],
        lineHeight: 1.4,
      },
    },
    fonts: [
      './src/assets/fonts/Inter-Regular.ttf',
      './src/assets/fonts/Inter-Bold.ttf',
    ],
  }),
});

export const getStaticPaths = route.getStaticPaths;
export const GET = route.GET;
