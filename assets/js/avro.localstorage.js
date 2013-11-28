// Candidate Selection Preferences Loader/Saver Based on html5 LocalStorage

function lSLoader() {
    if (localStorage.AvroCandidateSelection) {
        return JSON.parse(localStorage.AvroCandidateSelection);
    } else {
        return {};
    }
}

function lSSaver(cS) {
    log("saving CandidateSelection", cS);
    localStorage.AvroCandidateSelection = JSON.stringify(cS);
}