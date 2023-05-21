async function postData(url , data) {
      const res = await fetch(url, {
            method: "POST",
            headers: {
                  'Content-type': 'application/json; charset=UTF-8'
            },
            body: data,
      })

      return await res.json()
}

export {postData}