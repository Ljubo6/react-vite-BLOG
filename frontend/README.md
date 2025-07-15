Място за съхранение на данните:

- база данни чрез json-server
- BFF
- redux store

Същности на приложението:

- потребител: БД (списък на потребителите), BFF (сесия на текущият потребител), redux store (изобразяване в браузъра)
- роля на потребителя: БД (списък с роли), BFF (сесия на потребителя с ролята), redux store (използване на клиента)
- публикации: БД (списък със статии), redux store (изобразяване в браузъра)
- коментари: БД (списък с коментари), redux store (изобразяване в браузъра)

Таблици в БД:

- потребители - users: id / login / password / registered_at / role_id
- роли - roles: id / name
- публикации - posts: id / title / image_url / content / published_at
- коментари - comments: id / author_id / post_id / content / published_at

Схема със състоянието на BFF:

- сесия на текущият потребител: login / password / role

Схема за redux store (на клиента):

- user: id / login / roleId / session
- posts: (масив) post: id / title /imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: (масив) comment: id / author / content / publishedAt
- users: (масив) user: id / login / registeredAt / role
