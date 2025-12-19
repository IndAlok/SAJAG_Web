const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_CONTEXT = `You are SAJAG AI, an intelligent assistant for the National Disaster Management Authority (NDMA) Training Platform. You are an expert in:

- Disaster management and preparedness
- Training program planning and optimization
- Emergency response protocols
- Risk assessment and mitigation strategies
- NDMA policies and guidelines
- Geographic and thematic training coverage analysis

You help users with:
1. Analyzing training gaps and recommending new programs
2. Understanding disaster preparedness best practices
3. Interpreting analytics and statistics
4. Planning training schedules and resource allocation
5. Answering questions about disaster management protocols

Always provide accurate, actionable advice. Format your responses with proper markdown for clarity. Be concise but comprehensive.`;

export const generateAIResponse = async (userMessage, context = {}) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const contextInfo = context.stats 
    ? `\n\nCurrent Platform Statistics:\n- Total Trainings: ${context.stats.totalTrainings}\n- Total Participants: ${context.stats.totalParticipants}\n- Active Partners: ${context.stats.activePartners}\n- States Covered: ${context.stats.statesCovered}`
    : '';

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: SYSTEM_CONTEXT + contextInfo },
          ],
          role: 'user',
        },
        {
          parts: [
            { text: 'I understand. I am SAJAG AI, ready to assist with disaster management training queries. How can I help you today?' },
          ],
          role: 'model',
        },
        {
          parts: [
            { text: userMessage },
          ],
          role: 'user',
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate response');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('No response generated');
  }

  return text;
};

export const getQuickSuggestions = () => [
  'What training gaps exist in flood-prone states?',
  'Suggest a quarterly training plan for earthquake preparedness',
  'Analyze our current thematic coverage distribution',
  'What are best practices for community disaster training?',
  'How can we improve partner engagement?',
  'Recommend training programs for coastal regions',
];
