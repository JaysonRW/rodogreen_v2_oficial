"use client";

import { FormEvent, useState } from "react";
import WhatsAppAssistant from "./WhatsAppAssistant";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productImage, setProductImage] = useState(0);
  const [quoteSolution, setQuoteSolution] = useState("");
  const [quoteDeadline, setQuoteDeadline] = useState("");
  const [quoteBudget, setQuoteBudget] = useState("");
  const faqs = [
    { question: "A Rodogreen fabrica caçambas em medidas personalizadas?", answer: "Sim. A Rodogreen possui modelos padronizados, mas adequa dimensões, capacidade, cor, acabamento e detalhes construtivos conforme o veículo e a necessidade da operação." },
    { question: "Quais informações são necessárias para solicitar um orçamento?", answer: "O ideal é informar a cidade e o estado, marca e modelo do caminhão, tipo de carga, volume desejado e as personalizações necessárias. Se ainda não tiver todos os dados, a equipe realiza o levantamento técnico." },
    { question: "A Rodogreen realiza todo o processo de fabricação?", answer: "Sim. Engenharia, corte, dobra, solda, pintura, montagem e instalação são conduzidos pela própria Rodogreen, permitindo controle técnico e de acabamento em todas as etapas." },
    { question: "Qual é o prazo de fabricação de um implemento?", answer: "O prazo varia conforme o modelo, o veículo, o nível de personalização e a complexidade do projeto. A previsão é apresentada após o levantamento técnico e a definição do escopo." },
    { question: "Os implementos possuem garantia?", answer: "Sim. A Rodogreen oferece 180 dias de garantia contra defeitos de fabricação e montagem, conforme as condições do certificado entregue com o implemento, além de pós-venda especializado." },
    { question: "A Rodogreen atende clientes de quais regiões?", answer: "A Rodogreen atende pessoas físicas, empresas e órgãos públicos em todo o Brasil." },
  ];
  const productImages = [
    {
      src: "/images/basculante-hero.jpg", alt: "Caçamba basculante Rodogreen instalada em caminhão", label: "Basculantes",
      kicker: "Linha Forza · Basculantes", title: "Potência para operações exigentes.",
      description: "Caçambas de 8 a 16 m³ para areia, brita e terra, com configurações de ação direta, indireta ou pistão frontal. Estrutura robusta, hidráulica dimensionada e acabamento em pintura PU.",
      features: ["Aço estrutural de alta resistência", "Projeto adequado ao chassi e à aplicação", "Componentes conforme normas CONTRAN"],
      action: "Explorar basculantes",
    },
    {
      src: "/images/carroceria-personalizada.jpg", alt: "Carroceria aberta Rodogreen em acabamento azul e branco", label: "Carrocerias abertas",
      kicker: "Transporte de carga · Carrocerias abertas", title: "Versatilidade com construção sob medida.",
      description: "Carrocerias abertas desenvolvidas conforme o veículo, o tipo de carga e a rotina da operação. Dimensões, laterais, acabamento, cor e detalhes funcionais podem ser personalizados.",
      features: ["Configuração adequada ao tipo de carga", "Dimensões e acabamento personalizáveis", "Estrutura projetada para uso profissional"],
      action: "Conhecer carrocerias abertas",
    },
    {
      src: "/images/projeto-especial.jpg", alt: "Projeto especial Rodogreen com unidade técnica instalada em caminhão", label: "Projetos especiais",
      kicker: "Engenharia aplicada · Projetos especiais", title: "Uma solução criada para a sua finalidade.",
      description: "Unidades móveis, clínicas veterinárias, ambulatórios, escritórios sobre rodas e outras configurações especiais desenvolvidas a partir da necessidade real de cada cliente.",
      features: ["Levantamento técnico individual", "Estrutura e sistemas integrados ao projeto", "Fabricação completa em processo próprio"],
      action: "Apresentar um projeto especial",
    },
    {
      src: "/images/furgao-aluminio.jpg", alt: "Carroceria baú Rodogreen instalada em caminhão Mercedes-Benz", label: "Carrocerias baú",
      kicker: "Carga protegida · Carrocerias baú", title: "Proteção, volume e acabamento profissional.",
      description: "Carrocerias baú construídas para o transporte protegido de cargas, com configuração compatível com o chassi e possibilidade de adequações conforme a operação do cliente.",
      features: ["Construção adequada ao veículo", "Aproveitamento funcional do volume de carga", "Acabamento e detalhes personalizáveis"],
      action: "Conhecer carrocerias baú",
    },
  ];
  const activeProduct = productImages[productImage];
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
      "Carrocerias baú",
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
      `Prazo: ${data.get("deadline")}`,
      `Investimento: ${data.get("budget")}`,
      `Caminhão: ${data.get("truck") || "Não informado"}`,
      `Aplicação e especificações: ${data.get("details")}`,
    ];
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/5541999260108?text=${message}`, "_blank", "noopener,noreferrer");
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
          <img src="/images/logo-rodogreen-white.png" alt="Rodogreen — Implementos para o Transporte" />
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
        <div className="statement-heading">
          <p className="section-label">A qualidade está nos detalhes</p>
          <h2>Do primeiro risco ao acabamento final.</h2>
        </div>
        <div className="build-story">
          <div className="build-visual">
            <img
              src="/images/engenharia-a-estrada.png"
              alt="Caçamba basculante Rodogreen evoluindo do desenho técnico para o produto final"
            />
            <div className="build-sweep" aria-hidden="true" />
            <div className="build-manifesto">
              <span>Engenharia própria · Processo completo</span>
              <p>
                Há 15 anos, a Rodogreen transforma necessidades operacionais em implementos
                de alto padrão. Engenharia, corte, dobra, solda, pintura, montagem e instalação:
                todas as etapas realizadas por uma equipe que conhece o produto por inteiro.
              </p>
            </div>
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
            <img src={activeProduct.src} alt={activeProduct.alt} />
            <span className="photo-number">0{productImage + 1} / 04</span>
            <div className="product-gallery" aria-label="Galeria de implementos Rodogreen">
              {productImages.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  className={`${productImage === index ? "active" : ""} ${index === 0 ? "basculante-thumb" : ""}`.trim()}
                  onClick={() => setProductImage(index)}
                  aria-label={`Ver imagem: ${image.label}`}
                >
                  <img src={image.src} alt="" /><span>{image.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="feature-copy">
            <span className="product-kicker">{activeProduct.kicker}</span>
            <h3>{activeProduct.title}</h3>
            <p>{activeProduct.description}</p>
            <ul>
              {activeProduct.features.map((feature, index) => (
                <li key={feature}><span>0{index + 1}</span> {feature}</li>
              ))}
            </ul>
            <a className="outline-button" href="#orcamento">{activeProduct.action} <Arrow /></a>
          </div>
        </article>
        <div className="product-ribbon">
          <span>Basculantes</span><i />
          <span>Carrocerias abertas</span><i />
          <span>Projetos especiais</span><i />
          <span>Carrocerias baú</span>
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
          <p className="section-label light">Briefing de projeto · 01</p>
          <h2>O próximo implemento começa com uma boa conversa.</h2>
          <p>
            Conte o essencial agora. Nossa equipe recebe um briefing organizado e
            entra na conversa já entendendo o cenário da sua operação.
          </p>
          <ol className="quote-path">
            <li><span>01</span><div><strong>Você apresenta o desafio</strong><small>Aplicação, veículo, prazo e expectativa.</small></div></li>
            <li><span>02</span><div><strong>A engenharia interpreta</strong><small>Viabilidade, configuração e melhor caminho técnico.</small></div></li>
            <li><span>03</span><div><strong>O projeto ganha forma</strong><small>Proposta clara para avançar com segurança.</small></div></li>
          </ol>
          <div className="quote-assurance"><i /> Atendimento humano para todo o Brasil</div>
        </div>
        <div className="quote-card">
          <div className="quote-card-head">
            <div><span>Seu projeto</span><strong>Vamos entender a necessidade.</strong></div>
            <em>Leva cerca de 1 min</em>
          </div>
          <form onSubmit={sendQuote}>
            <div className="quote-fields">
              <label><span>Seu nome</span><input name="name" required autoComplete="name" placeholder="Como podemos chamar você?" /></label>
              <label><span>Cidade e estado</span><input name="region" required autoComplete="address-level2" placeholder="Ex.: Curitiba — PR" /></label>
            </div>

            <fieldset className="choice-fieldset">
              <legend><span>01</span> O que você busca?</legend>
              <input type="hidden" name="product" value={quoteSolution} />
              <div className="solution-grid" role="radiogroup" aria-label="Solução desejada">
                {[
                  ["Caçamba basculante", "Basculantes"],
                  ["Carroceria aberta", "Carga aberta"],
                  ["Carroceria baú", "Carga protegida"],
                  ["Projeto especial / unidade móvel", "Sob medida"],
                  ["Reforma ou manutenção", "Pós-venda"],
                  ["Outro implemento", "Quero orientação"],
                ].map(([value, detail], index) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={quoteSolution === value}
                    className={quoteSolution === value ? "selected" : ""}
                    key={value}
                    onClick={() => setQuoteSolution(value)}
                  >
                    <i>0{index + 1}</i><strong>{value}</strong><small>{detail}</small><span>✓</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="quote-fields compact">
              <label><span>Marca e modelo do caminhão</span><input name="truck" placeholder="Se já souber, informe aqui" /></label>
              <label><span>Aplicação principal</span><input name="details" required placeholder="Ex.: areia, brita, carga seca..." /></label>
            </div>

            <div className="choice-columns">
              <fieldset className="choice-fieldset compact-choice">
                <legend><span>02</span> Prazo desejado</legend>
                <input type="hidden" name="deadline" value={quoteDeadline} />
                <div role="radiogroup" aria-label="Prazo desejado">
                  {["Até 30 dias", "1 a 3 meses", "Estou planejando"].map((value) => (
                    <button type="button" role="radio" aria-checked={quoteDeadline === value} className={quoteDeadline === value ? "selected" : ""} key={value} onClick={() => setQuoteDeadline(value)}>{value}<i>✓</i></button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="choice-fieldset compact-choice">
                <legend><span>03</span> Investimento previsto</legend>
                <input type="hidden" name="budget" value={quoteBudget} />
                <div role="radiogroup" aria-label="Investimento previsto">
                  {["Até R$ 100 mil", "Acima de R$ 100 mil", "Preciso de orientação"].map((value) => (
                    <button type="button" role="radio" aria-checked={quoteBudget === value} className={quoteBudget === value ? "selected" : ""} key={value} onClick={() => setQuoteBudget(value)}>{value}<i>✓</i></button>
                  ))}
                </div>
              </fieldset>
            </div>

            <button className="quote-submit" type="submit" disabled={!quoteSolution || !quoteDeadline || !quoteBudget}>
              <span><small>Próximo passo</small>Conversar com um consultor</span><Arrow />
            </button>
            <p className="form-note"><i /> Seus dados seguem direto para o WhatsApp comercial da Rodogreen.</p>
          </form>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio">
          <img src="/images/logo-rodogreen-white.png" alt="Rodogreen — Implementos para o Transporte" />
        </a>
        <p>Implementos robustos. Engenharia personalizada.</p>
        <div><a href="#implementos">Implementos</a><a href="#projetos">Projetos especiais</a></div>
        <small>
          © 2026 Rodogreen Implementos. Todos os direitos reservados.
          <span aria-hidden="true"> · </span>
          <a href="https://propagounaweb.com.br" target="_blank" rel="noopener noreferrer">
            Criado por propagounaweb.com.br ↗
          </a>
        </small>
      </footer>
      <WhatsAppAssistant />
    </main>
  );
}
