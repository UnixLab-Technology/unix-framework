# Unix Framework

> Este arquivo foi gerado automaticamente pelo [Unix Framework](https://npmts.com/package/unix-framework)


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
- **./dist/** `->` Diretório de código compilado, após gerar uma build, para hospedar por exemplo, seu código virá para cá. `Não mexa aqui em hipótese alguma.`
- **./src/** `->` Diretório de código fonte, todo seu código typescript estará aqui.
- **./src/commands/** `->` Diretório de comandos do bot, aqui você poderá quantos comandos quiser para rodar em seu bot do discord. Você pode criar subpastas nesse diretório, exemplos:

    ```diff
    + ./src/commands/utils/help.ts
    + ./src/commands/common/help.ts
    + ./src/commands/mod/ban.ts
    + ./src/commands/protect/anti-spam.ts
    + ./src/commands/protect/antiSpam.ts

    - ./src/commands/help.ts
    - ./src/commands/protect/flood/config.ts
    - ./src/ommands/foo/bar/beez/command.ts
    ```
- **./src/events/** `->` Diretório de eventos do bot, aqui você poderá quantos eventos quiser para rodar em seu bot do discord. Você pode criar subpastas nesse diretório, exemplos:

    ```diff
    + ./src/events/utils/messageCreate.ts
    + ./src/events/common/messageCreate.ts
    + ./src/events/mod/onBanAdd.ts
    + ./src/events/protect/anti-spam.ts
    + ./src/events/protect/antiSpam.ts

    - ./src/events/messageCreate.ts
    - ./src/events/protect/flood/onGuildAdd.ts
    - ./src/events/foo/bar/beez/event.ts
    ```
- **./src/structs/** `->` Diretório de estruturas do bot, não é recomendado que mexa aqui, pois sem ele seu bot não funcionará. `Não mexa aqui se não sabe o que está fazendo!`
- **./.env** `->` Arquivo contendo as variáveis de ambiente do projeto. `Não mexa aqui se não sabe o que está fazendo!`
- **./.eslintrc.ts** `->` Arquivo de configuração do ESLint para qualidade de código. `Não mexa aqui se não sabe o que está fazendo!`
- **./.gitignore** `->` Arquivo de configuração do git, serve para definir arquivos e pastas que não irão para o repositório do git, caso haja. `Não mexa aqui se não sabe o que está fazendo!`
- **./index.ts** `-` Arquivo principal do bot, é por meio dele que tudo funciona! `Não mexa aqui se não sabe o que está fazendo!`
- **./package.tson** `->` Configurações do projeto. `Não mexa aqui se não sabe o que está fazendo!`
- **./tsconfig.tson** `->` Configurações do typescript. `Não mexa aqui se não sabe o que está fazendo!`


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