const { Configuration, OpenAIApi } = require('openai');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    // Initialize OpenAI configuration
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // Parse the incoming request body and extract the prompt
    const requestBody = JSON.parse(event.body);
    const prompt = requestBody.prompt;
    try {
        // Call the OpenAI API with the prompt
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 150,
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow requests from any origin
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ response: completion.data.choices[0].text }),
        };
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow requests from any origin
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ error: 'Error processing your request' }),
        };
    }

};
