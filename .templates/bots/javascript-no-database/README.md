# Unix Framework

> Este arquivo foi gerado automaticamente pelo [Unix Framework](https://npmjs.com/package/unix-framework)


Bem vindo ao seu mais novo projeto! Logo abaixo estará um guia para te ajudar com essa estrutura de pastas e algumas dicas gerais de programação.

# Sumário

1. [Entendendo a Estrutura](#entendento-a-estrutura)
2. [Criando uma Discord Application](#como-criar-uma-aplicação-no-discord)
3. [Declarações finais](#declarações-finais)
4. [Contribuindo](#contribuições)
5. [Autoria](#autor)
6. [Licença](#licenciamento)

## Entendendo a Estrutura 

- **./.vscode/** `->` Diretório de configuração do [Visual Studio Code](https://code.visualstudio.com), aqui tem configurações de algumas extensões, cujo as mesmas estão nas recomendações do workspace. `Não mexa aqui se não sabe o que está fazendo!`
- **./classes/** `->` Diretório de classes, aqui estarão as classes necessárias para criar comandos, eventos, cliente do discord, etc. Tudo que é necessário para funcionar esta estrutura e facilitar seu desenvolvimento. `Não mexa aqui se não sabe o que está fazendo!`
- **./commands/** `->` Diretório de comandos do bot, aqui você poderá quantos comandos quiser para rodar em seu bot do discord. Você pode criar subpastas nesse diretório, exemplos:

    ```diff
    + ./commands/utils/help.js
    + ./commands/common/help.js
    + ./commands/mod/ban.js
    + ./commands/protect/anti-spam.js
    + ./commands/protect/antiSpam.js

    - ./commands/help.js
    - ./commands/protect/flood/config.js
    - ./commands/foo/bar/beez/command.js
    ```
- **./events/** `->` Diretório de eventos do bot, aqui você poderá quantos eventos quiser para rodar em seu bot do discord. Você pode criar subpastas nesse diretório, exemplos:

    ```diff
    + ./events/utils/messageCreate.js
    + ./events/common/messageCreate.js
    + ./events/mod/onBanAdd.js
    + ./events/protect/anti-spam.js
    + ./events/protect/antiSpam.js

    - ./events/messageCreate.js
    - ./events/protect/flood/onGuildAdd.js
    - ./events/foo/bar/beez/event.js
    ```
- **./types/** `->` Diretório de tipos, esse diretório faz o visual studio code entender qual a tipagem das estruturas do bot. `Não mexa aqui se não sabe o que está fazendo!`
- **./.env** `->` Arquivo contendo as variáveis de ambiente do projeto. `Não mexa aqui se não sabe o que está fazendo!`
- **./.eslintrc.js** `->` Arquivo de configuração do ESLint para qualidade de código. `Não mexa aqui se não sabe o que está fazendo!`
- **./.gitignore** `->` Arquivo de configuração do git, serve para definir arquivos e pastas que não irão para o repositório do git, caso haja. `Não mexa aqui se não sabe o que está fazendo!`
- **./index.js** `-` Arquivo principal do bot, é por meio dele que tudo funciona! `Não mexa aqui se não sabe o que está fazendo!`
- **./package.json** `->` Configurações do projeto. `Não mexa aqui se não sabe o que está fazendo!`


## Como criar uma aplicação no discord?

Para começar a desenvolver seu bot você deve saber o que é uma aplicação no discord.

> Caso você já entenda essa parte pode pular para o próximo tópico!

Um bot do discord nada mais é uma aplicação, um aplicativo capaz de interagir com as APIs E SDKs do discord. A diferença entre bots e outras aplicações é que os bots possuem um perfil na plataforma assim como você.

As contas de bots possuem um identificador especial que usuários comuns são incapazes de possuir.
![Imagem Ilustrativa](https://i.imgur.com/A6DnmMo.png)

Agora vamos aprender como criar uma dessas:

1. Acesse o site de [desenvolvedores do discord](https://discord.com/developers/applications); ![Imagem Ilustrativa](https://i.imgur.com/PQArB7v.png)
2. Clique em `New Application` ou `Nova Aplicação` no canto superior direito;
3. Coloque o nome do seu bot e depois marque a caixa abaixo; ![Imagem Ilustrativa](https://i.imgur.com/GYZiGQc.png)
4. Clique no menu `Bot` na lateral esquerda da tela; ![Imagem Ilustrativa](https://i.imgur.com/vPW0KMZ.png)
5. Clique em `Create Bot` ou `Criar Bot` na lateral direita, após isso coloque o nome do seu bot;
6. Tome nota do "Token" ele será muito útil;
7. Coloque o token em `.env` no diretório raiz do projeto, seu arquivo deverá ficar parecido com isso:
![Imagem Ilustrativa](https://i.imgur.com/8P3d9dg.png)
8. Estamos prontos para codar!

## Declarações finais

Agora com todo o seu setup configurado basta criar seus comandos e eventos e para rodar seu bot use `npm start`.
> Se você tiver escolhido outro *Package Manager* como `Yarn` ou `PNPM` basta usar o mesmo comando só trocando o prefixo. 
```bash
$ yarn start
$ pnpm start
```

## Contribuições

Caso você tenha interesse em contrubuir com o desenvolvimento deste *framework* basta seguir os passos a seguir:
1. Clone este repositório:
```bash
    git clone https://github.com/UnixLab-Technology/unix-framework
    # Ou use a Github CLI
    gh repo clone https://github.com/UnixLab-Technology/unix-framework
```
2. Crie sua branch: `git checkout -b sua-feature-incrivel`;
3. Faça as modificações que achar necessárias;
4. Envie seu [`Pull Request`](https://github.com/UnixLab-Technology/unix-framework/pulls).

## Autor

Este software foi desenvolvido pelo time de desenvolvimento UnixLab e liderado por [Eric Freitas](https://github.com/freitaseric).

## Licenciamento

Este software está sob licenciatura [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)!