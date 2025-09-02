// 该模块可以调用 DeepSeek API，方便后期处理
// 请注意，该模块用的是 WCK 的 API Key。

import https from 'https';

// openrouter.ai 
const apiKey = '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';
const baseUrl = 'openrouter.ai';
const apiPath = '/api/v1/chat/completions';
const model = 'deepseek/deepseek-r1-0528:free';

// deepseek
// const apiKey = 'sk-17499a3e94614994bf54c6ffe63bc4a0';
// const baseUrl = 'api.deepseek.com';
// const apiPath = '/v1/chat/completions';
// const model = 'deepseek-chat';

/**
 * 调用 DeepSeek API 的简化函数
 * @param {string} userPrompt - 用户提示
 * @param {string} [systemPrompt='你是一个有帮助的助手'] - 系统提示
 * @param {Object} [options={}] - 可选参数
 * @returns {Promise<string>} - AI 生成的回复
 */
export default function deepseekChat(userPrompt, systemPrompt = '你是一个有帮助的助手', chatHistory = [], options = {}) {
	console.log('DeepSeek Chat:', userPrompt, systemPrompt, chatHistory, options);
	return new Promise((resolve, reject) => {
		// 构建请求体 [3,5](@ref)
		const requestJSON = {
			model: options.model || model,
			temperature: 0.0,
			messages: chatHistory.concat({ role: 'user', content: systemPrompt + '\n\n' + userPrompt }),
			...options
		};
		const requestBody = JSON.stringify(requestJSON);

		// 配置请求选项 [6,8](@ref)
		const requestOptions = {
			hostname: baseUrl,
			path: apiPath,
			method: 'POST',

			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`,
				'Content-Length': Buffer.byteLength(requestBody)
			}
		};

		// 发送请求 [7](@ref)
		const req = https.request(requestOptions, (res) => {
			let data = '';

			res.on('data', (chunk) => data += chunk);

			res.on('end', () => {
				try {
					const response = JSON.parse(data);
					if (!response.choices || response.choices.length === 0)
						reject('API 未返回有效回复');
					const content = response.choices[0].message.content;
					JSON.parse(content);
					resolve(content);

				}catch (e){
					console.log('Content is incomplete. Continuing...');
					const history = [
						...chatHistory,
						{ role: 'user', content: systemPrompt + '\n\n' + userPrompt },
						{ role: 'assistant', content: content }
					];
					deepseekChat('请继续生成', '', history, options).then(resolve).catch(reject);
				}
			});
		});

		req.on('error', (e) => reject(`API 请求失败: ${e.message}`));
		req.write(requestBody);
		req.end();
	});
}

/* 响应示例：
{
  id: 'ab41fe37-6176-43bc-b178-4e07cecec45e',
  object: 'chat.completion',
  created: 1749267546,
  model: 'deepseek-chat',
  choices: [
	{
	  index: 0,
	  message: { role: 'assistant', content: 'XC2236' },
	  logprobs: null,
	  finish_reason: 'stop'
	}
  ],
  usage: {
	prompt_tokens: 19,
	completion_tokens: 3,
	total_tokens: 22,
	prompt_tokens_details: { cached_tokens: 0 },
	prompt_cache_hit_tokens: 0,
	prompt_cache_miss_tokens: 19
  },
  system_fingerprint: 'fp_8802369eaa_prod0425fp8'
}
*/