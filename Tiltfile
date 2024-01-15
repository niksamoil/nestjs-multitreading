# Build docker images
docker_build(
  ref='api',
  context='.',
  dockerfile='api.dockerfile',
  live_update=[sync('.', '/app')],
  entrypoint=['npm', 'run', 'start:api-dev']
)
docker_build('some-service', context='.', dockerfile='./some.dockerfile', live_update=[sync('.', '/app')])


# Spin up k8s resources
k8s_yaml('./k8s/local/nats.yaml')
k8s_yaml('./k8s/local/api.yaml')
k8s_yaml('./k8s/local/some-service.yaml')

k8s_resource('nats-deployment', labels=['backend'])
k8s_resource('api', port_forwards=3001, labels=['backend'])
k8s_resource('some-service-deployment', labels=['backend'], resource_deps=['nats-deployment', 'api'])
