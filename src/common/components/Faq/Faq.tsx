import { Accordion, AccordionDetails, AccordionSummary, Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const faqData = [
  {
    question: '1',
    answer: 'Здесь будет ответ',
  },
  {
    question: '2',
    answer: 'Здесь будет ответ',
  },
  {
    question: '3',
    answer: 'Здесь будет ответ',
  },
  {
    question: '4',
    answer: 'Здесь будет ответ',
  },
]

export const Faq = () => {
  return (
    <Container maxWidth={'md'}>
      <Grid container sx={{ display: 'block', maxWidth: '800px', margin: '0 auto', p: 4 }}>
        <Grid>
          <Typography variant="h4" component="h1" align="center" marginBottom={5}>
            Часто задаваемые вопросы (FAQ)
          </Typography>
        </Grid>

        {faqData.map((item, index) => (
          <Grid key={index} sx={{ marginBottom: '16px' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" component="span">
                  {item.question}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
