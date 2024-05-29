export default function ModerationExamplesPage() {
    return (
        <main className='w-[66%]'>
            <h1 className='font-overpass text-4xl font-bold '>Moderation Service Examples</h1>
            <p className='font-roboto text-lg mb-5'>
                Here we will present examples of service integration in different languages
            </p>
            <section className='my-10'>
                <h2 className='font-overpass text-2xl font-bold'>JavaScript</h2>
                <div className='rounded bg-neutral-900 p-5'>
                    <pre>
                        <code className='flex flex-col gap-1 text-sm text-neutral-400 [&_span]:h-4'>
                            <span>
                                <span className='text-sky-400'>const</span> API_URL =
                                <span className='text-yellow-500'>'http://localhost:8000/api'</span>;
                            </span>
                            <span />
                            <span>
                                <span className='text-sky-400'>async function</span> analyzeText(text) {'{'}
                            </span>
                            <span>
                                <span className='text-sky-400 pl-8'>const</span> response ={' '}
                                <span className='text-sky-400'>await</span>{' '}
                                <span className='text-yellow-500'>fetch</span>
                                {'(`${API_URL}/text`, {'}
                            </span>
                            <span className='pl-16'>method: 'POST',</span>
                            <span className='pl-16'>headers: {'{'}</span>
                            <span className='pl-24'>'Content-Type': 'application/json',</span>
                            <span className='pl-24'>
                                Authorization: 'Api-Key <span className='text-yellow-500'>{'<API_TOKEN>'}</span>',
                            </span>
                            <span className='pl-16'>{'}'},</span>
                            <span className='pl-16'>body: JSON.stringify({'{ text }'}),</span>
                            <span className='pl-16'>{'});'}</span>
                            <span />
                            <span className='pl-8'>
                                <span className='text-sky-400'>if</span> (response.ok){' '}
                                <span className='text-sky-400'>return await</span> response.json();
                            </span>
                            <span>{'}'}</span>
                            <span />
                            <span>
                                <span className='text-sky-400'>async function</span> analyzeFile(type, file, lang) {'{'}
                            </span>
                            <span className='pl-8'>
                                <span className='text-sky-400'>const</span> data = new FormData();
                            </span>
                            <span className='pl-8'>data.append('file', file);</span>
                            <span className='pl-8'>data.append('lang', lang);</span>
                            <span />
                            <span>
                                <span className='text-sky-400 pl-8'>const</span> response ={' '}
                                <span className='text-sky-400'>await</span>{' '}
                                <span className='text-yellow-500'>fetch</span>
                                {'(`${API_URL}/${type}`, {'}
                            </span>
                            <span className='pl-16'>method: 'POST',</span>
                            <span className='pl-16'>headers: {'{'}</span>
                            <span className='pl-24'>'Content-Type': 'multipart/form-data',</span>
                            <span className='pl-24'>
                                Authorization: 'Api-Key <span className='text-yellow-500'>{'<API_TOKEN>'}</span>',
                            </span>
                            <span className='pl-16'>{'}'},</span>
                            <span className='pl-16'>body: data</span>
                            <span className='pl-16'>{'});'}</span>
                            <span />
                            <span className='pl-8'>
                                <span className='text-sky-400'>if</span> (response.ok){' '}
                                <span className='text-sky-400'>return await</span> response.json();
                            </span>
                            <span>{'}'}</span>
                        </code>
                    </pre>
                </div>
            </section>
        </main>
    );
}

const API_URL = 'http://localhost:8000/api';

async function analyzeText(text: string) {
    const response = await fetch(`${API_URL}/text`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Api-Key <API_TOKEN>`,
        },
        body: JSON.stringify({ text }),
    });
    if (response.ok) return await response.json();
}

async function analyzeFile(type: 'image' | 'audio' | 'video', file: File, lang: 'rus' | 'eng') {
    const data = new FormData();
    data.append('file', file);
    data.append('lang', lang);

    const response = await fetch(`${API_URL}/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Api-Key <API_TOKEN>`,
        },
        body: data,
    });
    if (response.ok) return await response.json();
}
