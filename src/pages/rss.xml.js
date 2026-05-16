import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const [dataEngineering, dataScience, mlEngineering, hobbies, labNotes, podcast] =
		await Promise.all([
			getCollection('data-engineering'),
			getCollection('data-science'),
			getCollection('ml-engineering'),
			getCollection('hobbies'),
			getCollection('labNotes'),
			getCollection('podcast'),
		]);

	const items = [
		...dataEngineering.map((p) => ({
			...p.data,
			_collection: 'data-engineering',
			_id: p.id,
		})),
		...dataScience.map((p) => ({
			...p.data,
			_collection: 'data-science',
			_id: p.id,
		})),
		...mlEngineering.map((p) => ({
			...p.data,
			_collection: 'ml-engineering',
			_id: p.id,
		})),
		...hobbies.map((p) => ({
			...p.data,
			_collection: p.data.sub, // route to /music/, /travel/, /languages/
			// strip subfolder prefix so links don't double up (e.g. music/music/slug)
			_id: p.id.replace(/^(travel|music|languages)\//, ''),
		})),
		...labNotes.map((p) => ({
			...p.data,
			_collection: 'lab-notes',
			_id: p.id,
		})),
		...podcast.map((p) => ({
			...p.data,
			_collection: 'podcast',
			_id: p.id,
		})),
	].sort((a, b) => +new Date(b.date) - +new Date(a.date));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: items.map((item) => ({
			title: item.title,
			pubDate: item.date,
			description: item.summary ?? item.context ?? '',
			link: `/${item._collection}/${item._id}/`,
		})),
	});
}
