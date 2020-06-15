import Link from 'next/link';
import Layout from '../components/Layout';
import { LoginComponent } from '../generated/apolloComponents';

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <LoginComponent>
      {(mutate) => (
        <button
          onClick={async () => {
            const response = await mutate({
              variables: { email: 'bob@bob.com', password: 'bobsadfsdf' },
            });

            if (response && response.data) {
              response.data?.login;
            }
            console.log(response);
          }}
        >
          Call login mutation
        </button>
      )}
    </LoginComponent>
  </Layout>
);

export default IndexPage;
