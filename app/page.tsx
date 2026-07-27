"use client";

import { FormEvent, useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productImage, setProductImage] = useState(0);
  const faqs = [
    { question: "A Rodogreen fabrica caçambas em medidas personalizadas?", answer: "Sim. A Rodogreen possui modelos padronizados, mas adequa dimensões, capacidade, cor, acabamento e detalhes construtivos conforme o veículo e a necessidade da operação." },
    { question: "Quais informações são necessárias para solicitar um orçamento?", answer: "O ideal é informar a cidade e o estado, marca e modelo do caminhão, tipo de carga, volume desejado e as personalizações necessárias. Se ainda não tiver todos os dados, a equipe realiza o levantamento técnico." },
    { question: "A Rodogreen realiza todo o processo de fabricação?", answer: "Sim. Engenharia, corte, dobra, solda, pintura, montagem e instalação são conduzidos pela própria Rodogreen, permitindo controle técnico e de acabamento em todas as etapas." },
    { question: "Qual é o prazo de fabricação de um implemento?", answer: "O prazo varia conforme o modelo, o veículo, o nível de personalização e a complexidade do projeto. A previsão é apresentada após o levantamento técnico e a definição do escopo." },
    { question: "Os implementos possuem garantia?", answer: "Sim. A Rodogreen oferece 180 dias de garantia contra defeitos de fabricação e montagem, conforme as condições do certificado entregue com o implemento, além de pós-venda especializado." },
    { question: "A Rodogreen atende clientes de quais regiões?", answer: "A Rodogreen atende pessoas físicas, empresas e órgãos públicos em todo o Brasil." },
  ];
  const productImages = [
    { src: "/images/basculante-hero.jpg", alt: "Caçamba basculante Rodogreen instalada em caminhão", label: "Potência" },
    { src: "/images/carroceria-personalizada.jpg", alt: "Carroceria personalizada Rodogreen em acabamento azul e branco", label: "Equilíbrio" },
    { src: "/images/furgao-aluminio.jpg", alt: "Implemento Rodogreen finalizado dentro da fábrica", label: "Precisão" },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rodogreen Implementos",
    url: "https://rodogreen.com.br/",
    foundingDate: "2011",
    description:
      "Fabricante brasileira de implementos rodoviários, caçambas basculantes, carrocerias personalizadas e projetos especiais.",
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    knowsAbout: [
      "Caçambas basculantes",
      "Carrocerias personalizadas",
      "Implementos rodoviários",
      "Projetos especiais móveis",
      "Furgões",
    ],
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  function sendQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "Olá! Quero solicitar um orçamento na Rodogreen.",
      "",
      `Nome: ${data.get("name")}`,
      `Cidade/UF: ${data.get("region")}`,
      `Produto: ${data.get("product")}`,
      `Caminhão: ${data.get("truck") || "Não informado"}`,
      `Aplicação e especificações: ${data.get("details")}`,
    ];
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/5541000000000?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Rodogreen — página inicial">
          <img src="/images/logo-rodogreen-horizontal.png" alt="Rodogreen — Implementos para o Transporte" />
        </a>
        <button
          className="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i /><i />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#implementos" onClick={() => setMenuOpen(false)}>Implementos</a>
          <a href="#engenharia" onClick={() => setMenuOpen(false)}>Engenharia</a>
          <a href="#projetos" onClick={() => setMenuOpen(false)}>Projetos especiais</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Dúvidas</a>
          <a href="#empresa" onClick={() => setMenuOpen(false)}>A Rodogreen</a>
        </nav>
        <a className="header-cta" href="#orcamento">Solicitar orçamento <Arrow /></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" role="img" aria-label="Caçamba basculante Rodogreen instalada em caminhão">
          <div className="hero-shade" />
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Indústria brasileira · desde 2011</p>
          <h1>Robustez que<br />vai além do aço.</h1>
          <p className="hero-copy">
            Implementos rodoviários com engenharia própria, fabricação completa e
            personalização para a realidade da sua operação.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#orcamento">Quero um projeto Rodogreen <Arrow /></a>
            <a className="text-link" href="#implementos">Conheça os implementos <span>↓</span></a>
          </div>
        </div>
        <div className="hero-index">
          <span>01</span>
          <div><i /></div>
          <span>04</span>
        </div>
        <div className="hero-proof">
          <strong>+3.000</strong>
          <span>implementos fabricados</span>
        </div>
      </section>

      <section className="statement" id="empresa">
        <p className="section-label">A qualidade está nos detalhes</p>
        <div>
          <h2>Do primeiro risco ao acabamento final.</h2>
          <p>
            Há 15 anos, a Rodogreen transforma necessidades operacionais em implementos
            de alto padrão. Engenharia, corte, dobra, solda, pintura, montagem e instalação:
            todas as etapas realizadas por uma equipe que conhece o produto por inteiro.
          </p>
        </div>
        <div className="build-story">
          <div className="build-visual">
            <img
              src="/images/engenharia-esboco-real-v1.png"
              alt="Representação conceitual da evolução de um projeto: do esboço técnico à caçamba basculante finalizada"
            />
            <div className="build-sweep" aria-hidden="true" />
            <div className="build-caption">
              <span>01—03</span>
              <strong>Da engenharia à estrada</strong>
            </div>
          </div>
          <div className="build-controls" aria-label="Etapas representadas na imagem">
            {[
              ["sketch", "01", "Esboço", "Geometria, aplicação e compatibilidade com o chassi."],
              ["structure", "02", "Estrutura", "Corte, dobra, solda e montagem sob controle próprio."],
              ["finish", "03", "Acabamento", "Preparação, pintura PU, instalação e conferência final."],
            ].map(([value, n, title, text]) => (
              <div key={value}>
                <span>{n}</span><strong>{title}</strong><small>{text}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="products" id="implementos">
        <div className="products-heading">
          <p className="section-label light">Soluções Rodogreen</p>
          <h2>Feitos para o trabalho.<br /><em>Projetados para durar.</em></h2>
        </div>
        <article className="feature-product">
          <div className="feature-photo">
            <img src={productImages[productImage].src} alt={productImages[productImage].alt} />
            <span className="photo-number">0{productImage + 1} / 03</span>
            <div className="product-gallery" aria-label="Galeria de implementos Rodogreen">
              {productImages.map((image, index) => (
                <button type="button" key={image.src} className={productImage === index ? "active" : ""} onClick={() => setProductImage(index)} aria-label={`Ver imagem: ${image.label}`}>
                  <img src={image.src} alt="" /><span>{image.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="feature-copy">
            <span className="product-kicker">Linha Forza · Basculantes</span>
            <h3>Potência, equilíbrio e precisão.</h3>
            <p>
              Caçambas de 8 a 16 m³ para areia, brita e terra, com configurações de
              ação direta, indireta ou pistão frontal. Estruturas em aço, hidráulica
              dimensionada e acabamento em pintura PU.
            </p>
            <ul>
              <li><span>01</span> Aço estrutural de alta resistência</li>
              <li><span>02</span> Projeto adequado ao chassi e à aplicação</li>
              <li><span>03</span> Componentes conforme normas CONTRAN</li>
            </ul>
            <a className="outline-button" href="#orcamento">Explorar basculantes <Arrow /></a>
          </div>
        </article>
        <div className="product-ribbon">
          <span>Basculantes</span><i />
          <span>Carrocerias abertas</span><i />
          <span>Projetos especiais</span><i />
          <span>Furgões</span>
        </div>
      </section>

      <section className="craft" id="engenharia">
        <div className="craft-title">
          <p className="section-label">Domínio de ponta a ponta</p>
          <h2>Não é apenas fabricação.<br />É cultura de engenharia.</h2>
        </div>
        <div className="craft-canvas">
          <div className="craft-photo">
            <img src="/images/furgao-aluminio.jpg" alt="Implemento Rodogreen em processo final dentro da fábrica" />
          </div>
          <div className="craft-note note-one">
            <strong>Solda MIG</strong>
            <span>Execução profissional e controle de acabamento.</span>
          </div>
          <div className="craft-note note-two">
            <strong>Pintura PU</strong>
            <span>Preparação química, fosfatização e acabamento superior.</span>
          </div>
          <div className="craft-note note-three">
            <strong>Engenharia própria</strong>
            <span>Do levantamento técnico à instalação no veículo.</span>
          </div>
        </div>
      </section>

      <section className="special" id="projetos">
        <div className="special-image">
          <img src="/images/projeto-especial.jpg" alt="Projeto especial Rodogreen com unidade acoplada ao caminhão" />
        </div>
        <div className="special-content">
          <p className="section-label light">Além do convencional</p>
          <h2>Sua necessidade pode ganhar rodas.</h2>
          <p>
            Clínicas veterinárias, ambulatórios, escritórios e unidades móveis.
            A Rodogreen desenvolve projetos especiais com estrutura, sistemas e
            acabamento pensados para cada finalidade.
          </p>
          <a className="primary-button dark" href="#orcamento">Falar sobre meu projeto <Arrow /></a>
        </div>
      </section>

      <section className="numbers" aria-label="Indicadores da Rodogreen">
        <div><strong>15</strong><span>anos de experiência</span></div>
        <div><strong>3.000+</strong><span>implementos fabricados</span></div>
        <div><strong>100%</strong><span>processo próprio</span></div>
        <div><strong>180</strong><span>dias de garantia</span></div>
      </section>

      <section className="process">
        <p className="section-label">Da ideia à estrada</p>
        <h2>Um processo claro.<br />Uma entrega sob medida.</h2>
        <ol>
          {[
            ["01", "Contato", "Conte sua necessidade e o contexto da operação."],
            ["02", "Levantamento técnico", "Entendemos veículo, carga e personalizações."],
            ["03", "Projeto e fabricação", "Engenharia e produção acompanhadas de ponta a ponta."],
            ["04", "Entrega e pós-venda", "Orientação técnica, garantia e suporte especializado."],
          ].map(([n, title, text]) => (
            <li key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </section>

      <section className="faq" id="faq">
        <div className="faq-heading">
          <p className="section-label">Perguntas frequentes</p>
          <h2>Antes de chegar à estrada, algumas dúvidas são naturais.</h2>
          <p>Reunimos respostas diretas sobre personalização, orçamento, fabricação, prazo e garantia. Para uma análise específica, fale com nossa equipe.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="quote" id="orcamento">
        <div className="quote-intro">
          <p className="section-label light">Comece seu projeto</p>
          <h2>Qual é o próximo desafio da sua operação?</h2>
          <p>
            Preencha os dados essenciais. A mensagem chega organizada ao comercial
            da Rodogreen para agilizar o primeiro atendimento.
          </p>
          <small>Atendimento para todo o Brasil · Pessoas físicas, empresas e órgãos públicos.</small>
        </div>
        <form onSubmit={sendQuote}>
          <label>Seu nome<input name="name" required placeholder="Como podemos chamar você?" /></label>
          <label>Cidade e estado<input name="region" required placeholder="Ex.: Curitiba — PR" /></label>
          <label>O que você busca?
            <select name="product" required defaultValue="">
              <option value="" disabled>Selecione uma solução</option>
              <option>Caçamba basculante</option>
              <option>Carroceria personalizada</option>
              <option>Projeto especial / unidade móvel</option>
              <option>Furgão</option>
              <option>Outro implemento</option>
            </select>
          </label>
          <label>Marca e modelo do caminhão<input name="truck" placeholder="Se já souber, informe aqui" /></label>
          <label className="full">Aplicação e especificações
            <textarea name="details" required placeholder="Conte o que será transportado, volume desejado e personalizações necessárias." />
          </label>
          <button type="submit">Enviar solicitação pelo WhatsApp <Arrow /></button>
          <p className="form-note">O número comercial definitivo será conectado antes da publicação oficial.</p>
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <img src="/images/logo-rodogreen-horizontal.png" alt="Rodogreen — Implementos para o Transporte" />
        </a>
        <p>Implementos robustos. Engenharia personalizada.</p>
        <div><a href="#implementos">Implementos</a><a href="#engenharia">Engenharia</a><a href="#projetos">Projetos especiais</a></div>
        <small>© 2026 Rodogreen Implementos. Todos os direitos reservados.</small>
      </footer>
    </main>
  );
}
