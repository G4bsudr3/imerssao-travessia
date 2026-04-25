const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

interface AnalyzeBody {
  responses: string[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as AnalyzeBody;
    if (!body?.responses || !Array.isArray(body.responses) || body.responses.length === 0) {
      return new Response(JSON.stringify({ error: "responses[] required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleaned = body.responses
      .map((r) => String(r ?? "").trim())
      .filter(Boolean)
      .slice(0, 200);

    const systemPrompt = `Você é analista de uma turma de palestra. Recebe respostas curtas em português brasileiro à pergunta "o que é sucesso na vida pra ti?". Identifica os 3-5 temas dominantes (ex: "liberdade", "família", "propósito", "dinheiro", "tempo", "impacto", "tranquilidade"), classifica a orientação geral das definições (material / relacional / propósito / liberdade / equilíbrio — escolha o que mais cabe entre: positivo, misto, cetico, receoso, considerando "positivo"=visão clara e expansiva de sucesso, "misto"=visões diversas, "cetico"=questionam o conceito de sucesso, "receoso"=ansiedade/pressão associada), e seleciona 3 quotes literais marcantes. Linguagem informal, direta, sem corporativês.`;

    const userPrompt = `Respostas (${cleaned.length}):\n\n${cleaned.map((r, i) => `${i + 1}. ${r}`).join("\n")}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report_sentiment",
              description: "Reporta análise estruturada da turma",
              parameters: {
                type: "object",
                properties: {
                  overall: {
                    type: "string",
                    enum: ["positivo", "misto", "cetico", "receoso"],
                    description: "Sentimento geral dominante",
                  },
                  gauge: {
                    type: "number",
                    description: "0 a 100, onde 0=muito receoso e 100=muito positivo",
                  },
                  themes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        label: { type: "string" },
                        weight: { type: "number", description: "0-100, peso relativo" },
                      },
                      required: ["label", "weight"],
                    },
                    minItems: 3,
                    maxItems: 5,
                  },
                  quotes: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1,
                    maxItems: 3,
                  },
                },
                required: ["overall", "gauge", "themes", "quotes"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "report_sentiment" } },
      }),
    });

    if (!aiRes.ok) {
      const txt = await aiRes.text();
      console.error("AI gateway error", aiRes.status, txt);
      return new Response(JSON.stringify({ error: `AI error ${aiRes.status}`, detail: txt }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "no tool call returned", data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const args = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(args), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    console.error("analyze-sentiment failed", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
