const obj = {
     title: 'titre'
}

function displayTitle (prefix) {
    console.log(`${prefix}${this.title}`)
}

const fnObj = displayTitle.bind(obj, 'mon titre est : ')

fnObj()

