const result = [
  {
    id: "2b5242e1-af77-48f2-a51d-50d46d6786a5",
    title: "POST",
    body: "Unpleasant nor diminution excellence apartments imprudence the met new. Draw part them he an to he roof only. Music leave say doors him. Tore bred form if sigh case as do. Staying he no looking if do opinion. Sentiments way understood end partiality and his.",
    createdAt: "2022-11-23T12:58:39.931Z",
    updatedAt: "2022-11-23T12:58:39.931Z",
    userId: "2",
    userName: "Ervin Howell",
    likes: [{ userId: "3", postId: "2b5242e1-af77-48f2-a51d-50d46d6786a5" }],
  },
  {
    id: "af660e41-01a6-4240-b9bb-2d90352ffc14",
    title: "POST",
    body: "He do subjects prepared bachelor juvenile ye oh. He feelings removing informed he as ignorant we prepared. Evening do forming observe spirits is in. Country hearted be of justice sending. On so they as with room cold ye. Be call four my went mean. Celebrated if remarkably especially an. Going eat set she books found met aware.",
    createdAt: "2022-11-23T12:58:39.933Z",
    updatedAt: "2022-11-23T12:58:39.933Z",
    userId: "4",
    userName: "Patricia Lebsack",
    likes: [],
  },
  {
    id: "e59d6d6a-1fd3-44ac-ac7f-b7b65bcaa13e",
    title: "POST",
    body: "Add you viewing ten equally believe put. Separate families my on drawings do oh offended strictly elegance. Perceive jointure be mistress by jennings properly. An admiration at he discovered difficulty continuing. We in building removing possible suitable friendly on. Nay middleton him admitting consulted and behaviour son household. Recurred advanced he oh together entrance speedily suitable. Ready tried gay state fat could boy its among shall.",
    createdAt: "2022-11-23T12:58:39.935Z",
    updatedAt: "2022-11-23T12:58:39.935Z",
    userId: "1",
    userName: "Leanne Graham",
    likes: [],
  },
  {
    id: "d4bd75a4-17d9-4ef7-ab9b-0528f7a2949b",
    title: "POST",
    body: "Ladyship it daughter securing procured or am moreover mr. Put sir she exercise vicinity cheerful wondered. Continual say suspicion provision you neglected sir curiosity unwilling. Simplicity end themselves increasing led day sympathize yet. General windows effects not are drawing man garrets. Common indeed garden you his ladies out yet. Preference imprudence contrasted to remarkably in on. Taken now you him trees tears any. Her object giving end sister except oppose.",
    createdAt: "2022-11-23T12:58:39.937Z",
    updatedAt: "2022-11-23T12:58:39.937Z",
    userId: "3",
    userName: "Clementine Bauch",
    likes: [{ userId: "4", postId: "d4bd75a4-17d9-4ef7-ab9b-0528f7a2949b" }],
  },
  {
    id: "6edee242-54f3-462e-aa25-6558b1eb48ad",
    title: "POST",
    body: "Lorem Ipsum comes from a latin text written in 45BC by Roman statesman, lawyer, scholar, and philosopher, Marcus Tullius Cicero. The text is titled de Finibus Bonorum et Malorum which means The Extremes of Good and Evil. The most common form of Lorem ipsum is the following:",
    createdAt: "2022-11-23T12:58:39.938Z",
    updatedAt: "2022-11-23T12:58:39.938Z",
    userId: "2",
    userName: "Ervin Howell",
    likes: [{ userId: "2", postId: "6edee242-54f3-462e-aa25-6558b1eb48ad" }],
  },
];

const pTags = (result, arg) => [
  ...result?.map((id) => ({ type: "Post", id })),
  "Post",
];

const xyz = pTags(result, "lol1");

console.log(xyz);
