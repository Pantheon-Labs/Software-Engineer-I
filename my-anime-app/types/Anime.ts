export default interface Anime {
    "anilist_id": number,
    "mal_id": number,
    "format": number,
    "status": number,
    "titles": {
        "en": string,
        "jp": string,
        "it": string
    },
    "descriptions": {
        "en": string,
        "it": string
    },
    "start_date": string,
    "end_date": string,
    "season_period": number,
    "season_year": number,
    "episodes_count": number,
    "episode_duration": number,
    "cover_image": string,
    "cover_color": string,
    "banner_image": string,
    "genres": Array<string>,
    "score": number,
    "id": number
}

