const venom = require('venom-bot');

venom.create({
  session: 'bot-session', // Nome da sessão do Venom
  multidevice: true, // Habilitar o modo multi-dispositivo
})
  .then((client) => start(client))
  .catch((erro) => console.log('Erro ao iniciar o bot:', erro));

function start(client) {
  client.onMessage((message) => {
    const { from, body } = message;

    // Responder com uma mensagem padrão
    client.sendText(from, `Você disse: ${body}`);
  });

  client.onStateChange((state) => {
    console.log('Estado atual:', state);
    if (state === 'CONFLICT') client.useHere();
  });
}
