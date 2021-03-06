import Image from 'next/image'
import { Character, GetCharacterResults } from "../../types"
import imageLoader from '../../imageLoader'
import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import styles from "../../styles/Character.module.css"

// Square brackets means that it is a dynamic route
function CharacterPage({character}: { character: Character}) {
    return <div className= {styles.container}>
        <h1>{character.name}</h1>
        <Image
            loader={imageLoader}
            unoptimized
            src={character.image}
            alt={character.name}
            width="200px"
            height="200px">
        </Image>
    </div>
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage){
    return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) =>
    {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`)
    const character = await res.json()
    return {
        props: {
            character
        }
    }
}
export default CharacterPage