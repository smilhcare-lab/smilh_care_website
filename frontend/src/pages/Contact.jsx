import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Card, Form, Button, Alert, Table, Ratio } from 'react-bootstrap'
import { FiArrowLeft, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

const contactCards = [
  {
    icon: <FiMapPin size={20} className="me-3 text-danger" />,
    title: 'Adresse',
    content: '12 rue des Lilas, 75015 Paris',
  },
  {
    icon: <FiPhone size={20} className="me-3 text-danger" />,
    title: 'Téléphone',
    content: '+33 6 12 34 56 78',
  },
  {
    icon: <FiMail size={20} className="me-3 text-danger" />,
    title: 'Email',
    content: 'contact@smilhcare.com',
  },
]

const openingHours = [
  { day: 'Lundi - Vendredi', hours: '8h00 - 19h00' },
  { day: 'Samedi', hours: '9h00 - 17h00' },
  { day: 'Dimanche', hours: 'Fermé' },
]

/**
 * Contact page for the healthcare website.
 * @returns {JSX.Element}
 */
export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: 'onTouched' })

  async function onSubmit(values) {
    setSubmitStatus('loading')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Une erreur est survenue.')
      }

      setSubmitStatus('success')
      setSubmitMessage('Votre demande a bien été envoyée. Nous vous contactons sous 24h.')
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error.message)
    }
  }

  return (
    <main className="py-5">
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <p className="text-danger fw-semibold mb-2">Contact</p>
            <h1 className="fw-bold">Besoin d’un accompagnement à domicile ?</h1>
            <p className="text-muted mx-auto" style={{ maxWidth: '680px' }}>
              Remplissez le formulaire ci-dessous et notre équipe vous proposera une solution adaptée dès que possible.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col xs={12} md={7}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3 mb-4">
                  <div>
                    <h2 className="h4 fw-bold mb-1">Formulaire de contact</h2>
                    <p className="text-muted mb-0">Tous les champs sont obligatoires pour un traitement rapide.</p>
                  </div>
                  <Button as={Link} to="/" variant="link" className="p-0">
                    <FiArrowLeft className="me-2" /> Retour à l’accueil
                  </Button>
                </div>

                {submitStatus === 'success' && <Alert variant="success">{submitMessage}</Alert>}
                {submitStatus === 'error' && <Alert variant="danger">{submitMessage}</Alert>}

                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Row className="g-3">
                    <Col xs={12} md={6}>
                      <Form.Group controlId="name">
                        <Form.Label>Nom complet *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Jean Dupont"
                          isInvalid={!!errors.name}
                          {...register('name', { required: 'Le nom est requis.' })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="jean.dupont@email.com"
                          isInvalid={!!errors.email}
                          {...register('email', {
                            required: 'L’email est requis.',
                            pattern: {
                              value: /\S+@\S+\.\S+$/,
                              message: 'Format d’email invalide.',
                            },
                          })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="g-3 mt-3">
                    <Col xs={12} md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>Téléphone *</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="06 12 34 56 78"
                          isInvalid={!!errors.phone}
                          {...register('phone', {
                            required: 'Le téléphone est requis.',
                            pattern: {
                              value: /^(?:\+33|0)[1-9](?:[ .-]?\d{2}){4}$/,
                              message: 'Format de téléphone invalide.',
                            },
                          })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="service">
                        <Form.Label>Sujet *</Form.Label>
                        <Form.Select
                          aria-label="Sujet de la demande"
                          isInvalid={!!errors.service}
                          {...register('service', { required: 'Le sujet est requis.' })}
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="Aide à domicile">Aide à domicile</option>
                          <option value="Garde d’enfants">Garde d’enfants</option>
                          <option value="Ménage & repassage">Ménage & repassage</option>
                          <option value="Assistance administrative">Assistance administrative</option>
                          <option value="Autre">Autre</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.service?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="message" className="mt-3">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Expliquez votre besoin et vos disponibilités..."
                      isInvalid={!!errors.message}
                      {...register('message', { required: 'Le message est requis.' })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="mt-4 d-grid">
                    <Button type="submit" variant="danger" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </Button>
                  </div>
                </Form>

                <p className="text-muted small mt-3 mb-0">
                  En envoyant ce formulaire, vous acceptez que nous vous contactions concernant votre demande.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={5}>
            <div className="d-grid gap-3">
              {contactCards.map((card) => (
                <Card key={card.title} className="shadow-sm border-0">
                  <Card.Body className="d-flex align-items-start gap-3">
                    {card.icon}
                    <div>
                      <Card.Title className="h6 mb-1">{card.title}</Card.Title>
                      <Card.Text className="text-muted mb-0">{card.content}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}

              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h3 className="h6 fw-semibold mb-3">Horaires d’ouverture</h3>
                  <Table borderless responsive className="mb-0">
                    <tbody>
                      {openingHours.map((item) => (
                        <tr key={item.day}>
                          <td className="text-muted">{item.day}</td>
                          <td className="fw-semibold">{item.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h3 className="h6 fw-semibold mb-3">Nous trouver</h3>
                  <Ratio aspectRatio="16x9">
                    <iframe
                      title="Google Maps Smile Care"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999123456789!2d2.293823615674987!3d48.858370079287254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fcf30babc01%3A0xe1d8db7d9760d3f7!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1234567890123"
                      allowFullScreen
                      loading="lazy"
                      className="w-100 h-100 border-0"
                    />
                  </Ratio>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
