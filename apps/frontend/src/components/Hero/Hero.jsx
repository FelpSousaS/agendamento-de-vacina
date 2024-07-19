import * as React from 'react';
import { Stack, HStack, Text, chakra } from '@chakra-ui/react';
import heroImg from '../../assets/hero_img.jpg';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Stack
      p={{ base: 5, md: 10 }}
      direction={{ base: 'column', md: 'row' }}
      bgImage={`url(${heroImg})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      minH="100vh"
      width="100%"
      color="white"
    >
      <Stack
        pos="relative"
        zIndex={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        bg="rgba(0, 0, 0, 0.5)"
        p={5}
        borderRadius="md"
        textAlign="center"
        maxW={{ base: '90%', md: '70%' }}
        mx="auto"
      >
        <chakra.h1
          fontSize={{ base: '3xl', sm: '5xl' }}
          lineHeight={1}
          fontWeight="bold"
        >
          Seja bem-vindo ao VacinaJá <br />
        </chakra.h1>
        <Text
          fontSize="1.2rem"
          lineHeight="1.375"
          fontWeight="400"
          color="white"
        >
          A saúde de todos depende de cada um de nós! Agende sua vacinação
          contra a COVID-19 e ajude a combater a pandemia. A vacina é segura,
          eficaz e essencial para sua proteção e de quem você ama. Clique e
          agende agora mesmo seu horário para a vacina!
        </Text>
        <HStack spacing={{ base: 0, sm: 2 }} flexWrap="wrap">
          <CustomButton
            variant="primary"
            onClick={() => navigate('/agendamentos/novo')}
          >
            Agendar
          </CustomButton>

          <CustomButton
            variant="secondary"
            onClick={() => navigate('/agendamentos')}
          >
            Lista de Agendamentos
          </CustomButton>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default Hero;
