import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'

const AllPosts = gql`
  query allPosts {
    allPosts {
      data {
        id
        title
        content
      }
      count
    }
  }
`

const Index = () => {
  const {data, loading} = useQuery(AllPosts)
  console.log("first loading", loading)
  console.log("first Data", data)

  return (
    <div>
      You're signed in as  and you're goto{' '}
      <Link href="/about">static</Link> page.
    </div>
  )
}

export default Index
