import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, Carousel } from 'react-bootstrap'
import { FiHeart, FiShield, FiUsers, FiClock, FiChevronRight } from 'react-icons/fi'
import heroImage from '../assets/hero.png'

const services = [
  {
    icon: <FiHeart size={28} />,
    title: 'Aide aux personnes âgées',
    description: 'Assistance chaleureuse et sécurisée pour préserver l’autonomie à domicile.',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Ménage & repassage',
    description: 'Entretien discret et régulier de votre logement, sans contrainte pour vous.',
  },
  {
    icon: <FiUsers size={28} />,
    title: 'Garde d’enfants',
    description: 'Accompagnement bienveillant et rassurant pour les plus petits.',
  },
  {
    icon: <FiClock size={28} />,
    title: 'Accompagnement médical',
    description: 'Présence à vos rendez-vous et soutien lors de vos soins.',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Assistance administrative',
    description: 'Aide à la gestion de vos démarches administratives et formulaires.',
  },
  {
    icon: <FiUsers size={28} />,
    title: 'Service personnalisé',
    description: 'Solutions sur mesure adaptées à votre situation familiale.',
  },
]

const testimonials = [
  {
    quote: 'L’équipe Smile Care est professionnelle et très à l’écoute. Nous sommes pleinement satisfaits.',
    author: 'Marie S.',
    role: 'Famille satisfaite',
  },
  {
    quote: 'La prise en charge est rassurante et vraiment personnalisée. Je recommande sans hésiter.',
    author: 'Antoine D.',
    role: 'Client régulier',
  },
  {
    quote: 'Le service est ponctuel et chaleureux. Ils ont su répondre à toutes nos attentes.',
    author: 'Sophie L.',
    role: 'Cliente',
  },
]

const stats = [
  { value: '150+', label: 'Clients aidés' },
  { value: '24/7', label: 'Disponibilité' },
  { value: '99%', label: 'Satisfaction' },
  { value: '12', label: 'Années d’expérience' },
]

/**
 * Home page for the healthcare website.
 * @returns {JSX.Element}
 */
export default function Home() {
  return (
    <main>
      <section
        className="py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 23, 74, 0.55), rgba(10, 23, 74, 0.55)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center g-4 flex-column-reverse flex-lg-row">
            <Col xs={12} lg={6}>
              <Badge bg="danger" className="text-uppercase px-3 py-2 mb-3">
                Disponible 7j/7
              </Badge>
              <h1 className="display-5 fw-bold text-white lh-sm">
                Votre bien-être à domicile,
                <br />
                <span className="text-danger">notre priorité.</span>
              </h1>
              <p className="text-white-50 fs-6 mb-4">
                Smile Care vous accompagne avec professionnalisme, chaleur et confiance pour faciliter votre quotidien.
              </p>
              <div className="d-grid gap-3 d-sm-flex">
                <Button as={Link} to="/contact" variant="danger" className="me-sm-2">
                  Devis gratuit <FiChevronRight />
                </Button>
                <Button as={Link} to="/services" variant="outline-light">
                  Nos services
                </Button>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4 text-white-50">
                <span>Écoute & accompagnement</span>
                <span>Réponse sous 24h</span>
                <span>Discrétion garantie</span>
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <Card className="border-0 shadow-lg bg-transparent">
                <Card.Img src={heroImage} alt="Soins à domicile" className="img-fluid rounded-4" />
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col xs={12} className="text-center">
              <p className="text-danger fw-semibold mb-2">Nos services</p>
              <h2 className="fw-bold">Des prestations complètes pour tous les besoins</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '680px' }}>
                Des solutions humaines et fiables pour accompagner votre famille, vos proches et vos proches aidants.
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {services.map((service) => (
              <Col key={service.title} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle mb-4" style={{ width: '56px', height: '56px' }}>
                      {service.icon}
                    </div>
                    <Card.Title className="h5">{service.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">{service.description}</Card.Text>
                    <Button as={Link} to="/contact" variant="outline-danger" className="mt-3 align-self-start">
                      En savoir plus
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-4">
            <Col xs={12} className="text-center">
              <p className="text-danger fw-semibold mb-2">Témoignages</p>
              <h2 className="fw-bold">Ils nous font confiance</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} lg={8}>
              <Carousel indicators={false} fade>
                {testimonials.map((item, index) => (
                  <Carousel.Item key={index}>
                    <Card className="shadow-sm border-0">
                      <Card.Body className="p-4">
                        <Card.Text className="text-muted mb-4">“{item.quote}”</Card.Text>
                        <div>
                          <p className="mb-1 fw-semibold">{item.author}</p>
                          <small className="text-muted">{item.role}</small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="g-3 text-center">
            {stats.map((stat) => (
              <Col key={stat.label} xs={6} md={3}>
                <div className="py-4 rounded-4 shadow-sm h-100">
                  <h3 className="display-6 fw-bold text-danger">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-danger text-white">
        <Container>
          <Row className="align-items-center g-4">
            <Col xs={12} md={8}>
              <h2 className="fw-bold">Prêt à recevoir un accompagnement personnalisé ?</h2>
              <p className="mb-0 text-white-75">
                Contactez-nous aujourd’hui pour un devis gratuit et une prise en charge adaptée à votre situation.
              </p>
            </Col>
            <Col xs={12} md={4}>
              <Button as={Link} to="/contact" variant="light" className="px-4 py-2">
                Contactez-nous
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  )
}
