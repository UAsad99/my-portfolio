import { useEffect, useState } from "react";
import Head from "next/head";
import { getBlogPageData } from "services";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BlogCard } from "components";
import { Anchor, SocialIcons, PowerButton, Logo, BigTitle } from "subcomponents";
import { mediaQueries } from "data";

const MainContainer = styled(motion.div)`
  background-image: url(/images/blog-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`;

const Container = styled.div`
  background-color: ${({theme}) => `rgba(${theme.bodyRgba},0.8)`};
  width: 100%;
  height: auto;
  position: relative;
  padding-bottom: 5rem;

  ::-webkit-scrollbar {
    display: none
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10rem;

  ${mediaQueries(30)`
    padding-top: 7rem;
  `};
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
  grid-gap: calc(1rem + 2vw);
  ${mediaQueries(50)`
    grid-template-columns: 100%;  
  `};
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
};

export default function Blog({ data }) {
  const [number, setNumber] = useState(0);

  const { blogData, blogPageTitle } = data;

  useEffect(() => {
    let num = (window.innerHeight - 70) / 30;
    setNumber(parseInt(num));
  }, []);

  return (
    <MainContainer
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Head>
        <title>{blogPageTitle}</title>
      </Head>
      <Container>
        <Logo />
        <PowerButton />
        <SocialIcons />
        <Anchor number={number} />
        <Center>
          <Grid variants={container} initial="hidden" animate="show">
            {blogData.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </Grid>
        </Center>
        <BigTitle text="blog" top="5rem" left="5rem" />
      </Container>
    </MainContainer>
  );
};


export async function getStaticProps() {
  const data = await getBlogPageData();

  return {
    props: {
      data
    }
  }
}

