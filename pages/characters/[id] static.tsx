import Image from 'next/image'
import { Character, GetCharacterResults } from "../../types"
import imageLoader from '../../imageLoader'

// Square brackets means that it is a dynamic route
function CharacterPage({character}: {
    character: Character
}) {
    return <div>
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

export async function getStaticPaths() {
    const res = await fetch("https://rickandmortyapi.com/api/character")
    const { results }: GetCharacterResults = await res.json()

    return {
        paths: results.map((character) => {
            return {params: {id: String(character.id)}}
        }),
        fallback: false
    }

}

export async function getStaticProps({params}: { params: {
    id: String
}}) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
    const character = await res.json()
    return {
        props: {
            character
        }
    }
}
export default CharacterPage