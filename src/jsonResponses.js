const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respond = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(content);
  response.end();
};


const success = (request, response, params, acceptedType) => {
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This is a successful response',
    };
    return respondJSON(request, response, 200, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>Success</name>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML);
  }
  return null;
};

const badRequest = (request, response, params, acceptedType) => {
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This request has the required parameters',
    };

    if (!params.valid || params.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }

    return respondJSON(request, response, 200, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.valid || params.valid !== 'true') {
      responseXML = `${responseXML} <name>Bad Request</name>`;
      responseXML = `${responseXML} <id>400</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML);
    }

    responseXML = `${responseXML} <name>Bad Request Success</name>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML);
  }
  return null;
};

const unauthorized = (request, response, params, acceptedType) => {
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This unauthorized request has the required parameters',
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseJSON.message = 'You are not logged in. Change loggedIn to yes.';
      responseJSON.id = 'unauthorized';
      return respondJSON(request, response, 401, responseJSON);
    }

    return respondJSON(request, response, 200, responseJSON);
  }
  if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    if (!params.loggedIn || params.loggedIn !== 'yes') {
      responseXML = `${responseXML} <name>Unauthorized</name>`;
      responseXML = `${responseXML} <id>401</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 401, responseXML);
    }

    responseXML = `${responseXML} <name>Unauthorized Success</name>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML);
  }
  return null;
};

const forbidden = (request, response, params, acceptedType) => {
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This is a forbidden location. Turn back now.',
      id: 'forbidden',
    };

    return respondJSON(request, response, 403, responseJSON);
  } if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>Forbidden</name>`;
    responseXML = `${responseXML} <id>403</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 403, responseXML);
  }
  return null;
};

const internal = (request, response, params, acceptedType) => {
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This is an internal. Oops.',
      id: 'internal',
    };

    return respondJSON(request, response, 500, responseJSON);
  } if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>Internal</name>`;
    responseXML = `${responseXML} <id>500</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 500, responseXML);
  }
  return null;
};

const notImplemented = (request, response, params, acceptedType) => {
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'This has not been added yet. How did you even find this...?',
      id: 'notImplemented',
    };

    return respondJSON(request, response, 501, responseJSON);
  } if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>Not Implemented</name>`;
    responseXML = `${responseXML} <id>501</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 501, responseXML);
  }
  return null;
};

const notFound = (request, response, params, acceptedType) => {
  if (acceptedType[0] === 'application/json') {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    return respondJSON(request, response, 404, responseJSON);
  } if (acceptedType[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>Not Found</name>`;
    responseXML = `${responseXML} <id>404</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 404, responseXML);
  }
  return null;
};

module.exports = {
  success,
  badRequest,
  notFound,
  forbidden,
  internal,
  notImplemented,
  unauthorized,
};
